// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Nft.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NftMarketPlace {
    struct NftListing {
        address payable creator;
        address nftAddress;
        uint256 price;
        string tokenUri;
        bool isListed;
    }

    event NFTCreated(string name, address nftAddress);
    event NFTBuy(address buyer, address nftAddress, uint256 price);
    event NFTSell(address seller, address nftAddress, uint256 price);

    // Function to receive ETh
    receive() external payable {}

    fallback() external payable {}

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    event DebugLog(string message, uint256 value);

    address public owner;
    bool private constant LISTED_NFT = true;

    constructor() {
        owner = msg.sender;
    }

    // Mapping to store listing by NFT token ID
    mapping(address => NftListing) private nftListings;
    address[] public listingNftContractAddress;
    mapping(address => mapping(address => uint256[])) private userOwnedTokens;
    mapping(address => uint256) public lastNftTokenId;

    function buyNft(address nftAddress) public payable {
        NftListing memory nftToBuy = nftListings[nftAddress];
        uint256 nftPrice = nftToBuy.price;
        // Check NFT is exist
        require(nftToBuy.creator != address(0), "NFT does not exist");
        require(nftToBuy.isListed, "NFT is delisted now");

        require(msg.value >= nftPrice, "Insufficient funds sent");

        // Transfer exact NFT price to the creator
        (bool success, ) = payable(address(this)).call{value: nftPrice}("");

        require(success, "NFT purchase failed");

        // Mint NFT to buyer
        uint256 lastTokenId = lastNftTokenId[nftAddress];
        NFT(payable(nftAddress)).mint(
            lastTokenId,
            msg.sender,
            nftToBuy.tokenUri
        );
        // Update NFT token id
        addToken(msg.sender, nftAddress, lastTokenId);
        lastNftTokenId[nftAddress] = lastNftTokenId[nftAddress] + 1;

        // Refund excess ETH back to the buyer
        uint256 excess = msg.value - nftPrice;
        if (excess > 0) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: excess}(
                ""
            );
            require(refundSuccess, "Refund failed");
        }
        emit NFTBuy(msg.sender, nftAddress, nftPrice);
    }

    // Function to add an NFT to the user's list
    function addToken(
        address user,
        address nftAddress,
        uint256 tokenId
    ) private {
        userOwnedTokens[user][nftAddress].push(tokenId);
    }

    function removeTokenId(
        address user,
        address nftAddress,
        uint256 tokenId
    ) private {
        uint256[] storage tokens = userOwnedTokens[user][nftAddress];
        uint256 length = tokens.length;

        require(length > 0, "No tokens to remove");

        for (uint256 i = 0; i < length; i++) {
            if (tokens[i] == tokenId) {
                // Swap with the last element and pop
                tokens[i] = tokens[length - 1];
                tokens.pop();
                return;
            }
        }

        revert("Token ID not found");
    }

    function sellNft(address nftAddress) public {
        NftListing storage nftToSell = nftListings[nftAddress];
        uint256 nftPrice = nftToSell.price;

        // Ensure the NFT exists and is listed
        require(nftToSell.creator != address(0), "NFT does not exist");
        require(nftToSell.isListed, "NFT is delisted now");

        // Ensure the seller owns the NFT
        uint256[] memory ownedTokens = getOwnedTokens(msg.sender, nftAddress);
        require(ownedTokens.length > 0, "No owned NFTs found");

        uint256 tokenIdToBurn = ownedTokens[0];

        // Ensure contract has enough ETH
        require(
            address(this).balance >= nftPrice,
            "Insufficient contract balance"
        );

        // Burn the NFT first
        try NFT((nftAddress)).burnNft(tokenIdToBurn) {
            // Transfer ETH to the seller
            (bool success, ) = (msg.sender).call{value: nftPrice}("");
            require(success, "ETH transfer failed");

            // Remove the token ID from the user's list
            removeTokenId(msg.sender, nftAddress, tokenIdToBurn);

            // Log sell event
            emit NFTSell(msg.sender, nftAddress, nftPrice);
        } catch {
            revert("NFT burn failed");
        }
    }

    function createNewNft(
        string memory name,
        string memory symbol,
        string memory tokenUri,
        uint256 price
    ) public {
        NFT newNft = new NFT(name, symbol);
        address createdNftAddress = address(newNft);
        require(price > 0, "Price must be greater than 0");

        NftListing memory newNftListing = NftListing(
            payable(msg.sender),
            createdNftAddress,
            price,
            tokenUri,
            LISTED_NFT
        );

        nftListings[createdNftAddress] = newNftListing;
        listingNftContractAddress.push(createdNftAddress);

        emit NFTCreated(name, createdNftAddress);
    }

    function getAllListing() public view returns (NftListing[] memory) {
        uint256 amountNftListing = listingNftContractAddress.length;
        NftListing[] memory allListings = new NftListing[](amountNftListing);

        for (uint256 i = 0; i < amountNftListing; i++) {
            allListings[i] = nftListings[listingNftContractAddress[i]];
        }

        return allListings;
    }

    function getNftBalances(address user,address nftContract) public view returns (uint256) {
        require(isValidNftContract(nftContract), "NFT contract not found");
        return NFT(nftContract).balanceOf(user);
    }

    function isValidNftContract(address nftContract)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < listingNftContractAddress.length; i++) {
            if (listingNftContractAddress[i] == nftContract) {
                return true;
            }
        }
        return false; // Not Found
    }

    // Function to get all token IDs owned by a user for a specific NFT contract
    function getOwnedTokens(address user, address nftAddress)
        public
        view
        returns (uint256[] memory)
    {
        return userOwnedTokens[user][nftAddress];
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Withdraw balance to specific addressƒ
    function withdrawTo(address payable _to) external {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");

        // Send ETH using call (recommended for better error handling)
        (bool success, ) = _to.call{value: balance}("");
        require(success, "ETH transfer failed");
    }
}

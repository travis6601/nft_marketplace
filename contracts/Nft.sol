// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function mint(
        uint256 tokenId,
        address to,
        string calldata _tokenUri
    ) public {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenUri);
    }

    function getNftBalance(address nftOwner) public view returns (uint256) {
        return balanceOf(nftOwner);
    }

    function burnNft(uint256 tokenId) public {
        _burn(tokenId);
    }
}

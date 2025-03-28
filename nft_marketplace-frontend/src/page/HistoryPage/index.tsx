"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import { Button } from "~/components/ui/shadcn/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/shadcn/table";
import { BACKEND_URL, EXPLORE_SCAN_TYPE } from "~/constants";
import useGetNfts from "~/hooks/useGetNfts";
import {
  generateExplorerUrl,
  generateNftImageIpfs,
  shortenAddress,
} from "~/utils";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
const HistoryPage = () => {
  const { address } = useAccount();
  const {
    data: userTransactionsRes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: async () => {
      const params = new URLSearchParams({
        address: address as string,
        page: "1",
        pageSize: "20",
      });

      const response = await fetch(
        `${BACKEND_URL}/transactions?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user transactions");
      }
      return response.json();
    },
    enabled: !!address,
  });

  const { data: nftCollectionsData } = useGetNfts();

  const userTransactions = useMemo(() => {
    if (
      userTransactionsRes?.data?.length === 0 ||
      nftCollectionsData?.data?.length === 0
    ) {
      return [];
    }

    return userTransactionsRes?.data.map((transaction: any) => {
      const nft = nftCollectionsData.data.find(
        (nft: any) => nft.address === transaction.nft_address
      );

      const nftSymbol = nft ? nft.symbol : "NFT not found";
      const nftImage = nft ? generateNftImageIpfs(nft.image) : "";

      if (!nft) {
        return null;
      }

      return {
        nftSymbol,
        nftImage,
        ...transaction,
      };
    });
  }, [userTransactionsRes?.data, nftCollectionsData?.data]);

  console.log("userTransactions", userTransactions);

  return (
    <div>
      {false ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse mr-2" />
          ))}
        </div>
      ) : (
        <Table>
          <TableCaption>Your NFT transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>NFT</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Transaction at</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userTransactions?.map((transaction: any) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium flex gap-1 items-center">
                  <Image
                    src={transaction.nftImage}
                    height={40}
                    width={40}
                    alt={`${transaction.nftSymbol}_image`}
                    className="rounded-full"
                  />
                  <p>{transaction.nftSymbol}</p>
                </TableCell>

                <TableCell>
                  <Link
                    href={generateExplorerUrl(
                      transaction.from_address,
                      EXPLORE_SCAN_TYPE.ADDRESS
                    )}
                    target="_blank"
                    className="font-bold"
                  >
                    {shortenAddress(transaction.from_address)}
                  </Link>
                </TableCell>

                <TableCell>
                  {transaction.type === "BUY" ? (
                    <div className="flex gap-2 items-center">
                      <Icon icon="icons8:buy" width={20} color="#0d9f6a" />
                      <p className="text-[#0d9f6a] font-bold">Buy</p>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <Icon icon="icons8:buy" width={20} color="#da1e28" />
                      <p className="text-[#da1e28] font-bold">Sell</p>
                    </div>
                  )}
                </TableCell>

                <TableCell className="">
                  {new Date(transaction.transaction_at).toLocaleString()}
                </TableCell>

                <TableCell>
                  <Link
                    href={generateExplorerUrl(
                      transaction.id,
                      EXPLORE_SCAN_TYPE.TRANSACTION
                    )}
                    target="_blank"
                    className="bg-[#6666c1] flex items-center px-4 py-2 w-[100px] rounded-2xl gap-2 text-white"
                  >
                    View <Icon icon="mingcute:external-link-line" width={14} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default HistoryPage;

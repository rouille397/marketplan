import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import {
  useContract,
  useNetwork,
  useNetworkMismatch,
  useCancelListing,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  ChainId,
  getNativeTokenByChainId,
  NATIVE_TOKEN_ADDRESS,
  TransactionResult,
  ListingType,
} from "@thirdweb-dev/sdk";
import { marketplaceContractAddress } from "../addresses";

const Cancel: NextPage = () => {
  const [nftId, setNftId] = useState('');
  const router = useRouter();
  const networkMismatch = useNetworkMismatch();

  // Connect to our marketplace contract via the useContract hook
  const { contract } = useContract(marketplaceContractAddress, "marketplace");
  console.log(contract, "contract");

  const {
    mutateAsync: cancelListing,
    isLoading,
    error,
  } = useCancelListing(contract);

  // async function cancelListing(
  //   contractAddress: string,
  //   tokenId: string,
  // ) {
  //   try {
  //     const transaction = await marketplace?.direct.cancelListing({
  //       assetContractAddress: contractAddress, // Contract Address of the NFT
  //       currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
  //       listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
  //       quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
  //       startTimestamp: new Date(0), // When the listing will start
  //       tokenId: tokenId, // Token ID of the NFT.
  //     });

  //     return transaction;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div className={styles.container}>
      <div className={styles.collectionContainer}>
        <h1 className={styles.ourCollection}>Cancel Direct Listing of an NFT</h1>

        {/* NFT Token ID Field */}
        <input
          type="text"
          name="tokenId"
          className={styles.textInput}
          placeholder="NFT Token ID"
          onChange={(e) => {
            // let eInt = parseInt(e.target.value);
            // if(!Number.isNaN(eInt))
            // {
              setNftId(e.target.value);
            // }else{
              // alert("Not a Number")
            // }
          }}
        />

        <br />
        {/* {typeof(nftId)} */}

        {/* <button
          type="submit"
          className={styles.mainButton}
          style={{ marginTop: 32, borderStyle: "none" }}
        > */}
        <Web3Button
          contractAddress={marketplaceContractAddress}
          action={() =>
            cancelListing({
              id: nftId,
              type: ListingType.Direct, // Direct (0) or Auction (1)
            })
          }
        >
          Cancel Listing
        </Web3Button>
        {/* </button> */}
      </div>
    </div>
  );
};

export default Cancel;

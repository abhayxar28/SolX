"use client";

import useWalletHook from "@/hooks/useWalletHook";
import {
  Keypair,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  ExtensionType,
  getAssociatedTokenAddressSync,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { useState } from "react";
import { toast } from "sonner";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import TurnstileWidget from "./Turnstile";

export default function CreateToken() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [image, setImage] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const { wallet, connection } = useWalletHook();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function createToken(e: React.FormEvent) {
    e.preventDefault();
    if (!wallet.publicKey) {
      toast.error("Connect your wallet first!");
      return;
    }
    if (!name || !symbol || !image) {
      toast.error("Please fill in all fields (Name, Symbol, Image).");
      return;
    }
    if (!token) {
      toast.error("Please complete CAPTCHA.");
      return;
    }

    setLoading(true);

    try {
      const mintKeypair = Keypair.generate();

      const metadata = {
        mint: mintKeypair.publicKey,
        name,
        symbol,
        uri: image,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataLen
      );

      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error("Failed CAPTCHA verification");
        setToken(null); 
        setLoading(false);
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          9,
          wallet.publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        })
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(mintKeypair);
      const sig = await wallet.sendTransaction(transaction, connection);

      toast.success(`Token created! ✅ Tx Sig: ${sig}`);

      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction2, connection);

      const supply =
        Number(initialSupply) > 0 ? Number(initialSupply) : 1_000_000_000;

      const transaction3 = new Transaction().add(
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          supply,
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction3, connection);

      toast.success("Initial supply minted 🎉");

      setName("");
      setSymbol("");
      setImage("");
      setInitialSupply("");
      setToken(null);
    } catch (err: any) {
      console.error(err);
      toast.error(`Error: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={createToken} className="mt-5">
        <h2 className="text-3xl font-bold mb-6">🪙 Create Token</h2>
        <p className="text-gray-400 mb-4">
          Launch your SPL Token in just a few steps.
        </p>
        <div className="w-full max-w-md space-y-4">
          <input
            value={name}
            placeholder="Token Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none"
          />
          <input
            value={symbol}
            placeholder="Symbol"
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none"
          />
          <input
            value={initialSupply}
            placeholder="Initial Supply"
            onChange={(e) => setInitialSupply(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none"
          />
          <input
            value={image}
            placeholder="Image"
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none"
          />

          <button
            disabled={!token || loading}
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105"
            }`}
          >
            {loading ? "Creating..." : "Create"}
          </button>

          <div className="flex justify-center items-center">
            <TurnstileWidget onVerify={setToken} />
          </div>
        </div>
      </form>
    </div>
  );
}

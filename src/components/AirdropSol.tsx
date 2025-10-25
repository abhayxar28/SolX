"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useWalletHook from "@/hooks/useWalletHook";
import { toast } from "sonner";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import TurnstileWidget from "./Turnstile";

export default function AirdropSOl() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const { wallet, connection } = useWalletHook();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestAirdrop = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!wallet.publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    if (!address) {
      toast.error("Enter a recipient address");
      return;
    }

    if (amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (!token) {
      toast.error("Please complete the CAPTCHA first");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Failed CAPTCHA verification");
        return;
      }

      await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);

      toast.success(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed or Limit Reached");
      setAddress("");
      setAmount(0);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={requestAirdrop} className="mt-20">
        <h2 className="text-3xl font-bold mb-6">🎁 Airdrop SOL</h2>
        <p className="text-gray-400 mb-4">Request free SOL (Devnet only) for testing.</p>

        <div className="w-full max-w-md space-y-4">
          <Input
            type="text"
            name="address"
            placeholder="Enter Wallet Address"
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none"
            disabled={loading}
          />

            <div className="relative w-full max-w-md">
                <Input
                    type="number"
                    name="amount"
                    value={amount}
                    min={0}
                    step={0.1}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Amount (SOL)"
                    className="w-full pr-10 px-3 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none text-base font-medium"
                />

                <div className="absolute inset-y-0 right-2 flex flex-col items-center justify-center gap-[1px] py-2 focus:border-none">
                    <button
                    type="button"
                    onClick={() => setAmount((prev) => Number((prev + 0.1).toFixed(1)))}
                    className="w-6 h-5 flex items-center justify-center rounded-t-md bg-gray-700 hover:bg-gray-600 text-white text-[10px] leading-none"
                    >
                    ▲
                    </button>
                    <button
                    type="button"
                    onClick={() =>
                        setAmount((prev) =>
                        prev - 0.1 >= 0 ? Number((prev - 0.1).toFixed(1)) : 0
                        )
                    }
                    className="w-6 h-5 flex items-center justify-center rounded-b-md bg-gray-700 hover:bg-gray-600 text-white text-[10px] leading-none"
                    >
                    ▼
                    </button>
                </div>
            </div>

          <TurnstileWidget onVerify={setToken} />

          <Button
            disabled={!token || loading}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:scale-105 transition"
          >
            {loading ? "Airdropping..." : "Airdrop"}
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useWalletHook from "@/hooks/useWalletHook";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { toast } from "sonner";

export default function SendSol(){
    const [recipientAddress, setRecipientAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const {wallet, connection} = useWalletHook();
    const [loading, setLoading] = useState(false);

    const sendSol = async(e: React.FormEvent)=>{
        e.preventDefault();

        if(!wallet.publicKey){
            toast.error("Wallet not connected");
            return;
        }

        if (!recipientAddress) {
            toast.error("Enter a recipient address");
            return;
        }

        if (amount <= 0) {
            toast.error("Enter a valid amount");
            return;
        }

        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(recipientAddress),
            lamports: amount * LAMPORTS_PER_SOL
        }))
        
        try{
            setLoading(true);
            await wallet.sendTransaction(transaction, connection);
            setRecipientAddress("");
            setAmount(0);
            toast.success("Sent " + amount + " SOL to " + recipientAddress);
        }catch(err){
            setRecipientAddress("");
            toast.error("Transaction failed");
            setAmount(0);
        }finally{
            setLoading(false)
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }

    return(
    <div className="flex flex-col items-center justify-center">
        <form onSubmit={sendSol} className="mt-30">
            <h2 className="text-3xl font-bold mb-6">📤 Send SOL</h2>
            <p className="text-gray-400 mb-4">
                Enter wallet address and amount to send SOL securely.
            </p>
            <div className="w-full max-w-md space-y-4">
                <Input
                    type="text"
                    name="recipientAddress"
                    value={recipientAddress}
                    onChange={(e)=>setRecipientAddress(e.target.value)}
                    placeholder="Recipient Wallet Address"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none"
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
                <Button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:scale-105 transition">
                    {loading ? "Sending.." : "Send"}
                </Button>
            </div>
        </form>
    </div>
    )
}
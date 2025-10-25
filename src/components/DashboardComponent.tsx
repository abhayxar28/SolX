"use client";

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import SendSol from "./SendSol";
import AirdropSOl from "./AirdropSol";
import CreateToken from "./CreateToken";
import useWalletHook from "@/hooks/useWalletHook";
import WalletButton from "./WalletButton";

type ActivePage = "dashboard" | "send" | "airdrop" | "create";

function DashboardContent() {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [balance, setBalance] = useState<number | null>(0);
  const {wallet, connection} = useWalletHook();

  const publicKey = wallet.publicKey;

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / 1e9);
    };
    fetchBalance();
  }, [publicKey, connection]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white flex">
      <aside className="w-64 bg-black/40 backdrop-blur-md border-r border-white/10 flex flex-col p-6">
        <h1
          onClick={() => setActivePage("dashboard")}
          className="cursor-pointer text-4xl ml-2 font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          SolX
        </h1>

        <nav className="flex flex-col gap-3">
          <button
            onClick={() => setActivePage("send")}
            className="px-4 py-3 rounded-xl hover:bg-gradient-to-r from-blue-500 to-purple-600 transition text-left"
          >
            📤 Send SOL
          </button>
          <button
            onClick={() => setActivePage("airdrop")}
            className="px-4 py-3 rounded-xl hover:bg-gradient-to-r from-blue-500 to-purple-600 transition text-left"
          >
            🎁 Airdrop SOL
          </button>
          <button
            onClick={() => setActivePage("create")}
            className="px-4 py-3 rounded-xl hover:bg-gradient-to-r from-blue-500 to-purple-600 transition text-left"
          >
            🪙 Create Token
          </button>
        </nav>

        <div className="mt-auto text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Solana Launchpad
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {activePage !== "dashboard" && (
          <button
            onClick={() => setActivePage("dashboard")}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer"
          >
            ← Back
          </button>
        )}

        {activePage === "dashboard" && (
            <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Welcome back, <span className="text-blue-400">Builder 🚀</span>
                </h2>
                <div>
                    <WalletButton />
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-gray-900/60 rounded-2xl border border-gray-700 shadow-lg">
                    <h3 className="text-gray-400 text-sm mb-2">Balance</h3>
                    <p className="text-2xl font-bold">
                    {balance !== null ? `${balance} SOL` : '0 SOL'}
                    </p>
                </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => setActivePage("send")}
                    className="p-6 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-lg hover:scale-105 transform transition"
                >
                    <div className="text-3xl mb-3">📤</div>
                    <h4 className="text-lg font-bold">Send SOL</h4>
                    <p className="text-sm text-gray-300">Transfer SOL instantly.</p>
                </button>

                <button
                    onClick={() => setActivePage("airdrop")}
                    className="p-6 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-lg hover:scale-105 transform transition"
                >
                    <div className="text-3xl mb-3">🎁</div>
                    <h4 className="text-lg font-bold">Airdrop SOL</h4>
                    <p className="text-sm text-gray-300">Request Devnet airdrop.</p>
                </button>

                <button
                    onClick={() => setActivePage("create")}
                    className="p-6 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-lg hover:scale-105 transform transition"
                >
                    <div className="text-3xl mb-3">🪙</div>
                    <h4 className="text-lg font-bold">Create Token</h4>
                    <p className="text-sm text-gray-300">Mint your own SPL token.</p>
                </button>
                </div>
            </>
        )}


        {activePage === "send" && <SendSol />}
        {activePage === "airdrop" && <AirdropSOl />}
        {activePage === "create" && <CreateToken />}
      </main>
    </div>
  );
}

export default function DashboardComponent() {
  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SOLANA || ""}
      config={{
        commitment: "confirmed",
        disableRetryOnRateLimit: true,
      }}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <DashboardContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

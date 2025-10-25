"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function useWalletHook(){
    const {connection} = useConnection();
    const wallet = useWallet();

    return {wallet, connection};
}


import Web3 from "web3";
import Web3Modal from "web3modal";

import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnect from "@walletconnect/client";

export const handleConnect = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "dcf94636764044c9a15a8df8a4da1bd8", // required
      },
    },
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
  });
  await web3Modal.clearCachedProvider();

  if (connector?.connected)
    connector?.killSession();


  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);
  const account = await web3.eth.getAccounts();
  try {
    let signature = await web3.eth.personal.sign(
      "Welcome to Concierge 2.0",
      account[0],
      ""
    );
    console.log(signature);
  } catch (err) {
    console.log(err);
  }
  return account;
}


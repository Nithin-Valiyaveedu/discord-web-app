import Web3 from "web3";
import Web3Modal from "web3modal";

import WalletConnectProvider from "@walletconnect/web3-provider";
// import WalletConnect from "@walletconnect/client";

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
    providerOptions // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);
  const account = await web3.eth.getAccounts();
  console.log(account[0]);
  let balance = await web3.eth.getBalance(account[0]);
  balance = web3.utils.fromWei(balance, "ether");
  console.log(balance);
}


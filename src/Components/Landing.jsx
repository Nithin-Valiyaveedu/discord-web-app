import React, { useEffect } from "react";
import { handleConnect } from "../Controller/connectWallet";

const Landing = () => {
  
  useEffect(() => {
    handleLoginWithWallet();
  }, []);

  const handleLoginWithWallet = async () => {
    const resp = await handleConnect();
    console.log(resp);

    // const result = resp?.[0];
    // if (result?.data?.success) {
    //   const userToken = result?.data?.data?.token;
    //   localStorage.setItem("userToken", userToken);
    //   localStorage.setItem("loginType", "Wallet");
    //   localStorage.setItem("walletConnected", "true");
    //   localStorage.setItem("walletAddress", resp[1]);
    //   dispatch(setAccount({ loggedIn: true, loginType: "Wallet" }));
    //   dispatch(
    //     setWalletDetails({
    //       walletConnected: true,
    //       walletAddress: resp[1],
    //       balance: resp[2],
    //     })
    //   );
    //   popup("Success", "Connection Successful", "success");
    //   navigate("/citizen");
    // } else {
    //   setClickLoader(false);
    // }
  };

  return (
    <>
      <h1 className="text-center text-3xl">Discord APP</h1>
    </>
  );
};

export default Landing;

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { handleConnect } from "../Controller/connectWallet";
import setupApi from "../Api/auth";
import { popup } from "../Utils/popup";

const Landing = () => {
  const [params, setParams] = useSearchParams();
  const userId = params.getAll("userId").toString();

  useEffect(() => {
    if (userId) handleLoginWithWallet();
  }, [userId]);

  const handleLoginWithWallet = async () => {
    const resp = await handleConnect();
    console.log(resp);
    let payload = {
      userId,
      walletAddress: resp,
    };

    console.log(payload);
    try {
      // setLoading(true);
      const response = await setupApi.userSetup(payload);
      console.log(response);
      popup("Success", "User Created Successfully", "success").then((res) => {
        setParams({});
      });
    } catch (err) {
      console.log(err.response.data.message);
      popup("Error", err.response.data.message, "error");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center">Discord Chatbot</h1>
    </>
  );
};

export default Landing;

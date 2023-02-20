import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import { handleConnect } from "../Controller/connectWallet";
import setupApi from "../Api/auth";
import { popup } from "../Utils/popup";

const supabase = createClient(
  "https://dauawcdclgotidietdhl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhdWF3Y2RjbGdvdGlkaWV0ZGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3ODY0MDAsImV4cCI6MTk5MjM2MjQwMH0.P-7cX1eAP4H8UUAPpsQAAQMspiHBQJ6XipZsNsCI6EY"
);

const Success = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const handleLoginWithWallet = async (id) => {
    const resp = await handleConnect();
    console.log(resp);
    let payload = {
      userId: id,
      walletAddress: resp,
    };
    console.log(payload);
    try {
      await setupApi.userSetup(payload);
      popup("Success", "User Created Successfully", "success");
      localStorage.setItem("loginSuccess", "true");
    } catch (err) {
      console.log(err.response.data.message);
      popup("Error", err.response.data.message, "error");
    } finally {
      // setLoading(false);
    }
  };

  //get discord user

  useEffect(() => {
    async function getCurrentUser() {
      await supabase.auth.getUser().then((value) => {
        console.log(value);
        if (value.data?.user) {
          console.log(value.data?.user);
          setUser(value.data?.user);
          handleLoginWithWallet();
          setLoader(false);
        }
      });
    }

    if (localStorage.getItem("loginSuccess") === "true") {
      setLoader(false);
      return
    } else getCurrentUser();
  }, []);

  async function signOutUser() {
    await supabase.auth.signOut();
    navigate("/");
    localStorage.removeItem("loginSuccess");
  }

  return (
    <>
      {loader ? (
        <h1>Loading</h1>
      ) : user ? (
        <>
          <h1>Successfully Logged In</h1>
          <button onClick={signOutUser}>SINGOUT</button>
        </>
      ) : (
        <>
          <h1>User Not logged in</h1>
          <button
            onClick={() => {
              localStorage.removeItem("loginSuccess");
              navigate("/");
            }}>
            Go to home
          </button>
        </>
      )}
    </>
  );
};

export default Success;
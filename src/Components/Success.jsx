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
  const [user, setUser] = useState({});
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
      // setLoading(true);
      const response = await setupApi.userSetup(payload);
      popup("Success", "User Created Successfully", "success");
    } catch (err) {
      console.log(err.response.data.message);
      popup("Error", err.response.data.message, "error");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    async function getCurrentUser() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data?.user);
          setUser(value.data?.user);
          handleLoginWithWallet(value.data?.user.id);
        }
        setLoader(false);
      });
    }
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      console.log(data);
    }

    getCurrentUser();
    getSession();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  }
  return (
    <>
      {Object.keys(user).length !== 0 ? (
        <>
          <h1>Successfully Logged In</h1>
          <button onClick={signOutUser}>SINGOUT</button>
        </>
      ) : !loader ? (
        <h1>User Not logged in</h1>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default Success;

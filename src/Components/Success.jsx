import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleLoginWithWallet = async (data) => {
    let createUserPayload = {
      userId: data.user_metadata.provider_id,
      userName: data.user_metadata.full_name,
    };
    const resp = await handleConnect();
    let payload = {
      userId: data.user_metadata.provider_id,
      walletAddress: resp,
    };

    try {
      await setupApi.checkUser(payload.userId);
      popup("Success", "User Logged in Successfully", "success");
      localStorage.setItem("loginSuccess", "true");
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 404) {
        try {
          await setupApi.userCreate(createUserPayload);
          await setupApi.userSetup(payload);
          popup("Success", "User Created Successfully", "success");
          localStorage.setItem("loginSuccess", "true");
        } catch (err) {
          console.log(err.response.data.message);
          popup("Error", err.response.data.message, "error");
        } finally {
          setLoader(false);
        }
      } else {
        popup("Error", "Something Went Wrong", "error");
      }
    }
  };

  //get discord user

  useEffect(() => {
    async function getCurrentUser() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data?.user.id);
          setUser(value.data?.user);
          localStorage.setItem("userData", value.data?.user);
          handleLoginWithWallet(value.data?.user);
          setLoader(false);
        }
      });
    }

    if (localStorage.getItem("loginSuccess") === "true") {
      setLoader(false);
      return;
    } else getCurrentUser();
  }, []);

  async function signOutUser() {
    await supabase.auth.signOut();
    navigate("/");
    localStorage.removeItem("loginSuccess");
  }
  // console.log(user);

  return (
    <>
      {loader ? (
        <h1>Loading</h1>
      ) : user || localStorage.getItem("loginSuccess") ? (
        <div className="signoutContainer">
          <h1>Successfully Logged In</h1>
          <button
            className="btn btn-position"
            onClick={signOutUser}>
            SINGOUT
          </button>
        </div>
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

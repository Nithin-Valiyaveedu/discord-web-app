import React, { useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import UserContext from "../Context/User/user.context";
const supabase = createClient(
  "https://dauawcdclgotidietdhl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhdWF3Y2RjbGdvdGlkaWV0ZGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3ODY0MDAsImV4cCI6MTk5MjM2MjQwMH0.P-7cX1eAP4H8UUAPpsQAAQMspiHBQJ6XipZsNsCI6EY"
);

const Landing = () => {
  const user = useContext(UserContext);

  const loginWithDiscord = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        // redirectTo: "https://discord-web-app.onrender.com/success",
        redirectTo: "http://localhost:3000/success",
      },
    });
  };
  console.log(user);

  return (
    <div className="landingContainer">
      <h1 className="">Discord Chatbot</h1>
      <button
        className="btn btn-position"
        onClick={loginWithDiscord}>
        Login With Discord
      </button>
    </div>
  );
};

export default Landing;

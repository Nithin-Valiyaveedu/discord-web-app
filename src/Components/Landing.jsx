import React from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dauawcdclgotidietdhl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhdWF3Y2RjbGdvdGlkaWV0ZGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3ODY0MDAsImV4cCI6MTk5MjM2MjQwMH0.P-7cX1eAP4H8UUAPpsQAAQMspiHBQJ6XipZsNsCI6EY"
);

const Landing = () => {
  const loginWithDiscord = async () => {
    const response = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "https://discord-web-app.onrender.com/success",
      },
    });
  };

  return (
    <>
      <h1 className="text-center">Discord Chatbot</h1>
      <button onClick={loginWithDiscord}>Login With Discord</button>
    </>
  );
};

export default Landing;

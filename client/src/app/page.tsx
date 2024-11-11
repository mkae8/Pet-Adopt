"use client";

import { useUser } from "@clerk/nextjs";
import HomeComp from "../components/HomeComp";

import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const user = useUser();
  // const [updated, setUpdated] = useState(false);
  useEffect(() => {
    if (user.isLoaded) {
      const registerUser = async () => {
        try {
          const res = await axios.post("http://localhost:8000/user/register", {
            firstName: user.user?.firstName,
            username: user.user?.username,
            lastName: user.user?.lastName,
            id: user.user?.id,
            email: user.user?.emailAddresses[0].emailAddress,
          });
        } catch (error) {
          console.log("Error registering user:", error);
        }
      };
      registerUser();
    }
  }, [user]);

  return (
    <>
      <HomeComp />
    </>
  );
};
export default Home;

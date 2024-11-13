"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

const UserControl = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = useUser();
  useEffect(() => {
    if (user.isLoaded) {
      const registerUser = async () => {
        try {
          await axios.post("http://localhost:8000/user/register", {
            firstName: user.user?.firstName,
            username: user.user?.username,
            lastName: user.user?.lastName,
            id: user.user?.id,
            email: user.user?.emailAddresses[0].emailAddress,
          });
          // console.log(user);
        } catch (error) {
          console.log("Error registering user:", error);
        }
      };
      registerUser();
    }
    const userDataUpdate = async () => {
      try {
        await axios.post("http://localhost:8000/user/update", {
          firstName: user.user?.firstName,
          username: user.user?.username,
          lastName: user.user?.lastName,
          id: user.user?.id,
          email: user.user?.emailAddresses[0].emailAddress,
        });
      } catch (error) {
        console.log("Error updating user:", error);
      }
    };
    userDataUpdate();
  }, [user]);

  return <>{children}</>;
};

export default UserControl;

"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Loading } from "../Loading";

const UserControl = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [loading, setLoading] = useState(false);
  const { user, isLoaded } = useUser();

  const handleUserSync = useCallback(async () => {
    if (!isLoaded || !user) return;

    setLoading(true);
    const userData = {
      firstName: user.firstName,
      username: user.username,
      lastName: user.lastName,
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
    };

    try {
      await axios.post(`${process.env.BACKEND_URL}/user/register`, userData);
    } catch (error) {
      console.log(`Error  user:`, error);
    } finally {
      setLoading(false);
    }

    try {
      await axios.post(`${process.env.BACKEND_URL}/user/update`, userData);
    } catch (error) {
      console.log(`Error  user:`, error);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    handleUserSync();
  }, [handleUserSync]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default UserControl;

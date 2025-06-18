"use client";

import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


import React from 'react'



const useLogout = () => {
  const router = useRouter();
  const { checkAuthStatus,user } = useAuth();

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("You have successfully logged out");
    
      await checkAuthStatus();
      router.push("/auth"); // ✅ uncomment this
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return logout;
};

export default useLogout;



"use client";

import { createContext, useState, useContext, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasRedirected = useRef(false); // 💡 Prevents repeated redirect/toast
  const router = useRouter();

  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user`, {
        withCredentials: true,
      });

      const fetchedUser = res.data.user;
      setUser(fetchedUser);

      
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = useMemo(() => ({ user, loading, checkAuthStatus }), [user, loading]);

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

'use client';

import { useAuth } from "@/context/authContext";
import Navbar from "../../components/Navbar";
import Loading from "../student/loading";
import Footer from "@/components/Footer";


export default function FrontpageLayout({ children }) {
  const { loading } = useAuth();

  return (
    <>
    <title>Lucis - Learning management system</title>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <main className="p-1 px-1 lg:px-2">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}

"use client";

import CertificateCard from "@/components/_studentComponent/CertificateCard";
import HeaderTitle from "@/components/_studentComponent/HeaderTitle";
import { StudentCourseCardSkeleton } from "@/components/CourseCardSkeleton";
import axios from "axios";
import { BookCheckIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function CertificatePage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certificate/all`,
        { withCredentials: true }
      );

      setCertificates(res.data.certificates);
    } catch (error) {
      //console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <HeaderTitle
          head={"Certificates"}
          text={"Browse your certificates"}
          className={"w-full bg-emerald-600 hover:bg-emerald-700 md:w-auto"}
          icon={<BookCheckIcon className="w-4 h-4" />}
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <StudentCourseCardSkeleton key={i} />
              ))}
          </div>
        ) : (
          <>
            {certificates.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert) => (
                  <CertificateCard key={cert.id} certificate={cert} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-700">
                  You haven't earned any certificate
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

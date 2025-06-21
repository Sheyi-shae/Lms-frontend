"use client"
import { useParams } from "next/navigation";


export default function CertificateVerificationPage() {
    const {id}=useParams();
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-600 mb-4">
          Certificate Verification
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          We're working on a feature to help you confirm and verify certificates issued by Lucis.
        </p>
        <div className="bg-emerald-100 text-emerald-800 p-4 rounded-xl">
          <p className="text-base font-medium">
            Coming Soon! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

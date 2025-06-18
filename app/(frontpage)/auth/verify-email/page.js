"use client"

import { useEffect, useState } from "react"
import {  useRouter } from "next/navigation"
import { CheckCircle, XCircle, Loader2, ArrowRight, RefreshCw, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import OtpInput from "@/components/ui/otpInput"
import axios from "axios"
import { toast } from "react-toastify"
import { useAuth } from "@/context/authContext"


export default function VerifyEmailPage() {
  const router = useRouter()
  const [verificationState, setVerificationState] = useState("otp_input") 
   // "loading" | "success" | "error" | "otp_input"
  const [otpValue, setOtpValue] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
 const {user,loading}= useAuth()
  const [resendCountdown, setResendCountdown] = useState(0)

  useEffect(() => {
    if (!loading && user?.isVerified) {
      if(user?.role === "student"){
        router.push("/student")}
        else if(user?.role === "instructor"){
          router.push("/instructor")
    }}}, [user, loading])

  const handleVerifyOtp = async () => {
    if (otpValue.length !== 6) return

    setIsVerifying(true)

    try {
      // This is where you would make an API call to verify the OTP
     const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verify-user/${user?.id}`,
        {
          otpValue,
        },
        { withCredentials: true });
        setVerificationState("success")
      setResendCountdown(0) // Reset countdown on success
         toast.success(res.data?.message);
      
   
     
    } catch (error) {
      setVerificationState("error")
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false)
      setOtpValue("") // Clear OTP input after verification
    }
  }

  const handleResendVerification = async () => {
    // Reset to loading state
    setVerificationState("loading")

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/resend/${user?.id}`,
        {},
        { withCredentials: true }
      )
      
      toast.success(res.data?.message);
      
    } catch (error) {
      setVerificationState("error")
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
      
    }finally {
       setVerificationState("otp_input")
    setOtpValue("")
      setResendCountdown(60)
    }
  
  }

  useEffect(() => {
    if (resendCountdown <= 0) return

    const timer = setTimeout(() => {
      setResendCountdown(resendCountdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [resendCountdown])

  const handleNavigation = () => {
    if (verificationState === "success" && user?.role === "student") {
      router.push("/student")
    } else if (verificationState === "success" && user?.role === "instructor") {
      router.push("/instructor")
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      {!user?.isVerified && <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mx-auto mb-4">
            {(verificationState === "loading" || isVerifying) && (
              <Loader2 className="h-6 w-6 text-gray-600 animate-spin" />
            )}
            {verificationState === "success" && <CheckCircle className="h-6 w-6 text-emerald-500" />}
            {verificationState === "error" && <XCircle className="h-6 w-6 text-red-500" />}
            {verificationState === "otp_input" && !isVerifying && <Mail className="h-6 w-6 text-gray-600" />}
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {verificationState === "loading" && "Verifying your email"}
            {verificationState === "success" && "Email verified!"}
            {verificationState === "error" && "Verification failed"}
            {verificationState === "otp_input" && "Verify your email"}
          </CardTitle>
          <CardDescription className="text-center">
            {verificationState === "loading" && "Please wait while we confirm your email address..."}
            {verificationState === "success" &&
              "Your email has been successfully verified. You can now access all features."}
            {verificationState === "error" && "We couldn't verify your email. The link may have expired or is invalid."}
            {verificationState === "otp_input" &&
              `We'll send a 6-digit code to ${user?.email}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {verificationState === "loading" && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-gray-500 h-2.5 rounded-full w-3/4 animate-pulse"></div>
              </div>
            )}

            {verificationState === "otp_input" && (
              <div className="space-y-4">
                <OtpInput value={otpValue} onChange={setOtpValue} length={6} disabled={isVerifying} />

                <Button
                  className="w-full mt-4"
                  onClick={handleVerifyOtp}
                  disabled={otpValue.length !== 6 || isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-2">
                  Didn't receive a code? Check your spam folder
                  {resendCountdown > 0 ? (
                    <span className="text-gray-500 ml-1">
                      (Resend available in <span className="font-medium">{resendCountdown}s</span>)
                    </span>
                  ) : (
                    <button
                      className="text-gray-900 underline underline-offset-2 font-medium ml-1"
                      onClick={handleResendVerification}
                      disabled={isVerifying}
                    >
                      resend code
                    </button>
                  )}
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {verificationState === "success" && (
            <Button className="w-full" onClick={handleNavigation}>
              Continue to dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {verificationState === "error" && (
            <Button className="w-full" onClick={handleResendVerification}>
              Resend verification email
              <RefreshCw className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button variant="outline" className="w-full mt-2" onClick={() => router.push("/")}>
            Back to home
          </Button>
        </CardFooter>
      </Card>}
    </div>
  )
}

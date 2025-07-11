"use client"
import { useState } from "react"
import { SignInForm } from "@/components/forms/SignIn"
import { SignUpForm } from "@/components/forms/SignUp"
import { HomeTabs } from "@/components/HomeTabs"

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("sign-up") 

  const handleRegistrationSuccess = () => {
    setActiveTab("sign-in") 
  }

  
  const tabs = [
    {
      title: "Sign in",
      content: (
        <div className="space-y-4">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Sign in to your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <SignInForm />
        </div>
      ),
    },
    {
      title: "Sign up",
      content: (
        <div className="space-y-4">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please enter valid credentials
            </p>
          </div>
          <SignUpForm onSuccess={handleRegistrationSuccess} />
        </div>
      ),
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <HomeTabs
        key={activeTab} // Ensure the component re-renders on tab change
        defaultValue={activeTab}
        tabClassName="grid w-full grid-cols-2 md:grid-cols-2 lg:w-auto h-16 bg-slate-50"
        tabs={tabs}
      />
    </div>
  )
}

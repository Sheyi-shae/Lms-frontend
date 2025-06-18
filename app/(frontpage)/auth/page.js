"use client"
import { SignInForm } from '@/components/forms/SignIn'
import React, { useEffect } from 'react'
import Image from 'next/image'

import AuthTabs from './AuthTabs'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'


export default function page() {
  const router =useRouter()
  const {user,loading}=useAuth()
  useEffect(() => {
    // Redirect logic should be inside useEffect
    if (!loading && user?.isVerified) {
      if (user?.role === 'instructor') {
        router.push('/instructor')
      } else if (user?.role === 'student') {
        router.push('/student')
      }
    }
  }, [user, loading,])

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-12 w-12 bg-emerald-700 text-white p-3 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }
  
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-2 sm:px-6 md:w-1/2 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-sm sm:max-w-md">
          {/* <div className="mb-8 flex justify-center">
            <Image
              src="/placeholder.svg?height=40&width=160"
              width={160}
              height={40}
              alt="Company Logo"
              className="h-10 w-auto"
            />
          </div> */}
          
          <AuthTabs/>
          
        </div>
      </div>

      {/* Right side - Image (hidden on mobile) */}
      <div className="hidden bg-emerald-50 md:block md:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src="/images/authimage.png"
            alt="Office workspace"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-background/80" />
        </div>
      </div>
    </div>
  )
}


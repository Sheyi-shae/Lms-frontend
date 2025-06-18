"use client"
import InstructorAuthTabs from '@/components/instructorComponents/InstAuthTab'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
    const {user,loading}=useAuth()
    const router=useRouter()
    if(user && !loading) router.push('/instructor') 
  return (
    <div >
        <InstructorAuthTabs/>
    </div>
  )
}

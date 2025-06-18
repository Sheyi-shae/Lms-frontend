"use client"

import { useEffect, useState } from "react"
import { LogOut, Menu } from "lucide-react"
import { useAuth } from "@/context/authContext"
import { useRouter } from 'next/navigation'

import StudentSidebar from "@/components/_studentComponent/studentSidebar"
import UnauthorizedWarning from "@/components/UnauthourizedWarning"
import { toast } from "react-toastify"
import Loading from "./loading"
import useLogout from "@/apiRequest/logout"

export default function RootLayout({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
   const [showUnauthorized, setShowUnauthorized] = useState(false)

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const {user,loading,checkAuthStatus} = useAuth()
 
  const router=useRouter()
 

 
 useEffect(() => {
  checkAuthStatus()
    if (!loading) {
      if (!user) {
        router.push("/auth");
      } else if (user?.isVerified === false) {
        router.push("/auth/verify-email");
      } else if (user?.role !== "student") {
        setShowUnauthorized(true);
      }
    }
  }, [user, loading]);

 
  
const logout =useLogout()
  
  

if(loading) return <Loading/>

if (showUnauthorized) return <UnauthorizedWarning />;

  return (
 
    <div className="flex h-screen w-full overflow-hidden bg-white">
    <StudentSidebar isMobileOpen={isMobileOpen} toggleMobileSidebar={toggleMobileSidebar} user={user} loading={loading} />

    {/* Main Content */}
    <div className="flex flex-1  flex-col overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 flex h-16 items-center bg-background/80 backdrop-blur-md border-b border-border/40 px-4 ">
        <button className="rounded-lg p-1 hover:bg-gray-100 md:hidden" onClick={toggleMobileSidebar}>
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="ml-4 text-xl font-semibold">{user ? user.name : 'Dashboard'}</h1>
        {user && (
          <button onClick={logout} className="ml-auto p-2 bg-red-600 rounded-sm hover:bg-red-500">
            <LogOut className='text-gray-50'/>
          </button>
        )}
      </header>

      {/* Scrollable Content Area */}
      
      {user?.role === 'student' &&<main className="flex-1 overflow-auto p-6">{children}</main>}
    </div>
  </div>
      
  )
}


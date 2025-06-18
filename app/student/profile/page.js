"use client"
import ProfileForm from "@/components/instructorComponents/Profile-Form"
import { useAuth } from "@/context/authContext"
import axios from "axios"
import { useState, useEffect } from "react"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState(null)
    const [hasFetched, setHasFetched] = useState(false)

  async function fetchUser() {
    try {
        
      if ( user) {
        setIsLoading(true)

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user.id}`,
          { withCredentials: true }
        )

        setUsers(response.data.user)
        console.log("Fetching user data...", response.data.user)
      }
    } catch (err) {
      console.error("Error fetching user:", err)
    } finally {
      setIsLoading(false)
    }
  }

useEffect(() => {
        if (user?.id && !hasFetched) {
            fetchUser();
            setHasFetched(true); 
        }
    }, [user, hasFetched]); 



  

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">View and manage your account settings</p>
          </div>
          {/* <DeleteAccountDialog userId={user.id} /> */}
        </div>

        {isLoading  ? (
          <p>Loading, please wait...</p>
        ) : (
         users && <ProfileForm user={users} />
        )}
      </div>
    </div>
  )
}

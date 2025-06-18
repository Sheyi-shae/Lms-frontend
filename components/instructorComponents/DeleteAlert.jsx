"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function DeleteAlert({isDeleteDialogOpen,setIsDeleteDialogOpen,courseId}) {

    const router = useRouter()
    const [loading, setLoading] = useState(false)   

function handleDeleteCourse(courseId){
    setLoading(true)
   try {
    axios
        .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/${courseId}`, {
            withCredentials: true,
        })
       
          
            setIsDeleteDialogOpen(false)
            toast.success("Course deleted successfully")
            router.push("/instructor/courses/my_courses")

       
        
   } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while deleting the course."
      toast.error(errorMessage)
    
   }finally {
    setLoading(false)
    }
    
}
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the course and all associated lessons and
                                        materials.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={()=>handleDeleteCourse(courseId)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
  )
}

"use client"

import { Calendar, Clock, User2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { dateConverter } from "@/lib/dateConverter"
import { getStatusLabel } from "@/lib/getStatusLabel"
import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"


export default function ProgressTracker({ course,progress,completedLessons,totalLessons }) {

const  [loading, setLoading] = useState(false)
// Determine the status label and color based on progress
  const status = getStatusLabel(progress)

  //handle gernerate certificate
  const handleGenerateCertificate = async (courseId) => {
    try {
      setLoading(true)
      const res = await axios.post(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certificate`,
        { courseId },
        {
          withCredentials: true,
         }
      )
      toast.success(res.data.message)
      
    } catch (error) {
     const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);  
    }finally {  
      setLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden border-l-4 border-l-emerald-600 transition-all hover:shadow-md">
      
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
         
          <span className={`text-xs font-medium ${status.color}`}>{status.label} </span>
        </div>
        <Link href={`/student/coursedetails/${course.id}`} className="group">
          <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-primary">{course.title}</h3>
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="mt-2 text-xs text-muted-foreground">
          {completedLessons} of {totalLessons} lessons completed
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Last accessed: {dateConverter(course.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.duration ?? "40"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col pt-0">
        <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800">
          <Link href={`/student/coursedetails/${course.id}`}>
            {progress === 0 ? "Start Course" : progress === 100 ? "Review Course" : "Continue Learning"}
          </Link>
        </Button>
        {progress === 100 && (
        <Button
  variant="outline"
  className="mt-2 w-full"
  disabled={loading}
  onClick={() => handleGenerateCertificate(course.id)}
>
  {loading ? "Issuing..." : "Generate Certificate"}
</Button>

            
        )}
      </CardFooter>
    </Card>



  )
}

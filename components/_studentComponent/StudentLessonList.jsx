"use client"

import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import {
  Clock,
  LoaderPinwheel,
  LockIcon,
  UnlockIcon,
  Video,
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import axios from "axios"
import { toast } from "react-toastify"
import { CardContent } from "../ui/card"
import { AlertTriangle } from "lucide-react";

export function StudentLessonList({ course}) {
  const [lessons, setLessons] = useState([])
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)
    const [selectedLesson, setSelectedLesson] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLessonCompleted, setIsLessonCompleted] = useState(false)
    const [hasError, setHasError] = useState(false);

  const instructorName = course.instructor.name
  const instructorId = course.instructor.id
  const instructorEmail = course.instructor.email
    

  // Fetch lessons + enrollment
  const fetchLesson = async () => {
    if (!course?.id) return

    try {
      setLoading(true)
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/lesson/course/${course.id}`,
        { withCredentials: true }
      )
      setLessons(res.data.data)
      setEnrollment(res.data.enrollment) 
    } catch (err) {
      toast.error("Error fetching course data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Handle enroll action
  const handleEnrollment = async () => {
    
    try {
      setIsEnrolling(true)
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enroll/course/${course.id}`,
     {instructorName,instructorId,instructorEmail},
        { withCredentials: true }
      )
      toast.success(`Successfully enrolled in course "${course.title}"`)

      // Refresh lessons + enrollment status
      await fetchLesson()

      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Enrollment failed")
    } finally {
      setIsEnrolling(false)
    }
  }




  //handle video end
  const handleVideoEnd = async (lessonId) => {
    try {
      setIsLessonCompleted(true)
      const res=await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/lesson/course/complete`,
        { lessonId, courseId: course.id },
        { withCredentials: true }
      )
      toast.success(res.data.message)
      fetchLesson()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error marking lesson as complete")
    }finally {
      setIsLessonCompleted(false)
    }
  }

  useEffect(() => {
    if (course?.id) {
      fetchLesson()
    }
  }, [course?.id])

  return (
    <>
      {loading ? (
        <div className="text-md flex w-[50%] mx-auto justify-center bg-emerald-600 p-3 text-slate-50 gap-2 items-center">
          <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
          Loading lessons...
        </div>
      ) : (
        <div className="relative space-y-1">
          {/* Overlay if not enrolled */}
          {!enrollment && (
            <div className="absolute inset-0 bg-black/50 p-2 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white rounded-md">
              <LockIcon className="h-10 w-10 mb-2" />
              <p className="text-sm font-semibold mb-4">
                Enroll to access lessons
              </p>
              <CardContent className="pt-2 w-full max-w-xs">
                <Button
                  onClick={handleEnrollment}
                  disabled={isEnrolling}
                  className="w-full bg-emerald-700 text-white hover:bg-emerald-800 disabled:cursor-not-allowed"
                >
                  {isEnrolling ? (
                    <>
                      <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Enroll Now"
                  )}
                </Button>
              </CardContent>
            </div>
          )}

          {/* Lesson list */}
          <Accordion type="single" collapsible className="w-full">
            {lessons.map((lesson, index) => (
              <AccordionItem key={lesson.id} value={lesson.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                    <AccordionTrigger className="hover:no-underline py-0">
                      <div className="flex flex-col items-start text-left">
                        <span
                          className={`text-sm font-medium ${
                            lesson.isLocked ? "opacity-30" : ""
                          }`}
                        >
                          {lesson.position}. {lesson.title}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{lesson?.type}</span>
                          <span className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {lesson.duration || 40} min
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </div>
                  <div className="flex items-center gap-2">
                    {lesson.isLocked ? <LockIcon size={16} /> : <UnlockIcon size={16} />}
                  </div>
                </div>
                <AccordionContent className="pb-4 pt-0 pl-11">
                  <p
                    className={`text-sm text-muted-foreground mb-4 ${
                      lesson.isLocked ? "opacity-50" : ""
                    }`}
                  >
                    {lesson.content}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={lesson.isLocked || !enrollment}
                    onClick={() => {
                      setSelectedLesson(lesson)
                      setIsModalOpen(true)
                    }}
                  >
                    {lesson.isLocked || !enrollment
                      ? "🔒 Lesson Locked"
                      : "▶ Start Lesson"}
                  </Button>
                </AccordionContent>
                {index < lessons.length - 1 && <Separator />}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

    
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="w-full md:max-w-4xl p-0 overflow-hidden">
              <DialogTitle className="sr-only">
      Playing Lesson Video
    </DialogTitle>
    
              <div className="w-full aspect-video">
                {isLessonCompleted && (
            <div className="absolute inset-0 bg-black/50 p-2 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white rounded-md">
             <LoaderPinwheel className="mr-2 h-10 w-10 animate-spin bg-emerald-700 text-white" />
              <p className="text-sm font-semibold mb-4">Marking lesson as complete...</p>
              </div>
                )}
                {selectedLesson && !hasError ? (
  <ReactPlayer
    url={selectedLesson.videoUrl}
    controls
    playing
    width="100%"
    height="100%"
    onEnded={() => handleVideoEnd(selectedLesson.id)}
    onError={() => setHasError(true)}
  />
) : hasError ? (
  <div className="flex flex-col items-center justify-center h-full bg-red-50 text-red-700 p-6 rounded-md">
    <AlertTriangle className="w-10 h-10 mb-2" />
    <p className="text-lg font-semibold">Video failed to load</p>
    <p className="text-sm text-center text-gray-600 mt-1">
      This video may be private, unavailable, or the link is broken.
    </p>
    <Button
      variant="outline"
      className="mt-4"
      onClick={() => {
        setHasError(false)
        setSelectedLesson(null)
        setIsModalOpen(false)
      }}
    >
      Close & Try Another Lesson
    </Button>
  </div>
) : null}

              </div>
            </DialogContent>
          </Dialog>
    </>
  )
}

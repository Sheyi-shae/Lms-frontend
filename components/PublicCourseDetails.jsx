"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star, Clock, Users, Play, Award, CheckCircle, Globe, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import timeAgo from "@/lib/timeAgo"
import { useAuth } from "@/context/authContext"
import Link from "next/link"
import { toast } from "react-toastify"
import { useState } from "react"
import SigninDialog from "./SigninDialog"



export default function PublicCourseDetails({ course}) {
    const {loading:userLoading, user} = useAuth()
     const [enrollment, setEnrollment] = useState(null)
     const [isEnrolling, setIsEnrolling] = useState(false)
     const [isModalOpen, setIsModalOpen] = useState(false)
       const instructorName = course.instructor.name
  const instructorId = course.instructor.id

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Handle enroll action
  const handleEnrollment = async () => {
    
    try {
      setIsEnrolling(true)
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enroll/course/${course.id}`,
     {instructorName,instructorId},
        { withCredentials: true }
      )
      toast.success(`Successfully enrolled in course "${course.title}"`)

     

      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Enrollment failed")
    } finally {
      setIsEnrolling(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="mb-4 bg-emerald-500 hover:bg-emerald-500">{course.category.name}</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl mb-6 text-emerald-100">{course.description}</p>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{course.rating || 4}</span>
                    
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{course.enrollments.length} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration || 30}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {course.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{course.instructor.name}</p>
                    <p className="text-emerald-200 text-sm">{course.instructor.title || 'software dev'}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-1"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-xl">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Image
                      src={course.imageUrl || "/placeholder.svg"}
                      alt={course.title}
                      width={400}
                      height={225}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      size="lg"
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                  </div>

                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-emerald-600">$Free</span>
                      <span className="text-lg text-gray-500 line-through">${40}</span>
                    </div>
                    <p className="text-sm text-red-600 font-medium">Limited time offer!</p>
                  </div>

                 {!userLoading && user && user.role === 'student' ? (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {course.enrollments.some(enrollment => enrollment.studentId === user.id) ?
                      <>
                       <Link href={`/student/coursedetails/${course.id}`}><Button
                        className="w-full mb-4 bg-slate-600 hover:bg-slate-700" size="lg">
                    Continue Learning
                  </Button></Link>  </> : <Button onClick={handleEnrollment}  className="w-full mb-4 bg-emerald-600 hover:bg-emerald-700" size="lg">
                    Enroll Now
                  </Button>}
                    </span>
                  ):(
                    <Button onClick={()=>setIsModalOpen(true)} className="w-full mb-4 bg-emerald-600 hover:bg-emerald-700" size="lg">
                      Sign in to Enroll
                    </Button>
                  )}
                 
          

                 

                  {/* <div className="space-y-2 text-sm">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
               
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
               
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <motion.div variants={itemVariants}>
                 

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Course Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{course.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

             

              <TabsContent value="instructor" className="mt-6">
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-2xl">
                            {course.instructor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">{course.instructor.name}</h3>
                          <p className="text-emerald-600 font-medium mb-4">{course.instructor.title ||"software dev"}</p>

                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-semibold">{course.instructor.rating || 4.5}</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold mb-1">{ 200}</div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold mb-1">{course.instructor.courses}</div>
                              <p className="text-sm text-gray-600 dark:text-gray-400"> 5 Courses</p>
                            </div>
                          </div>

                          </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

             
            </Tabs>
          </div>

          {/* Sidebar */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Course Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Lessons</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{course.lessons.length} lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{course.duration || 40}</p>
                    </div>
                  </div>
                  
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{timeAgo(course.updatedAt) }</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <SigninDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  )
}

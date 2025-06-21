"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star,  Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/authContext"
import Link from "next/link"
import { StudentCourseCard } from "./_studentComponent/StudentCourseCard"
import { StudentCourseCardSkeleton } from "./CourseCardSkeleton"



export default function CoursesSection({courses,loading}) {
 
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

  return (
    <>
    {loading ? (
      <StudentCourseCardSkeleton/>
    ) : (
      <>
        {courses.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-300">No courses available at the moment.</p>
          </div>
        )}
      </>
    )}
    <section id="courses" className="py-2 dark:bg-gray-800 sm:py-8">
      <div className="container  px-4 mx-auto sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">Popular Courses</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-300">
            Discover our most popular courses taught by industry experts and loved by thousands of students.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1  gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {courses.slice(0,6).map((course, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white border-l-4 border-emerald-600 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={course.imageUrl || "/placeholder.svg"}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full dark:bg-emerald-900 dark:text-emerald-300">
                    {course.category.name}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <Link href={`/courses/${course.id}`}><h3 className="text-base font-semibold line-clamp-2 text-gray-900 dark:text-white mb-2">{course.title.toUpperCase()}</h3></Link>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">by {course.instructor.name}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{course.rating || 4}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrollments.length}</span>
                  </div>
                  
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$Free</span>
                  
                 
                    <Link href={`/courses/${course.id}`}><Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Details
                    </Button></Link>
                  
                  
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href={'/courses'}><Button className={'bg-emerald-700 hover:bg-emerald-800'} size="lg">
            View All Courses
          </Button></Link>
        </motion.div>
      </div>
    </section>
    </>
  )
}

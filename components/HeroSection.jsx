"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/context/usemobile"
import Link from "next/link"

export default function HeroSection() {
  const isMobile = useMobile()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.8 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, delay: 0.5 },
    },
  }

  return (
    <section className="relative  overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-950">
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/25"></div>

      <div className="container relative px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:py-32">
        <motion.div
          className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="max-w-2xl">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-emerald-700 rounded-full bg-emerald-50 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950 dark:text-emerald-300">
                New Features Available
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
              variants={itemVariants}
            >
              Unlock your potential with <span className="text-emerald-600 dark:text-emerald-400">modern</span> learning
            </motion.h1>

            <motion.p className="mt-6 text-lg text-gray-600 dark:text-gray-300" variants={itemVariants}>
              Our learning management system provides an intuitive, engaging experience that helps students achieve
              their goals faster. Access courses anytime, anywhere, on any device.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 mt-8" variants={itemVariants}>
              <Link href={'/auth'}><Button  size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button></Link>
              <Link href={'/courses'}><Button size="lg" variant="outline">
                Explore Courses
              </Button></Link>
            </motion.div>

            <motion.div className="grid grid-cols-3 gap-4 mt-12" variants={statsVariants}>
              <div className="p-4 text-center rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">500+</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
              </div>

              <div className="p-4 text-center rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">50K+</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
              </div>

              <div className="p-4 text-center rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">98%</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
              </div>
            </motion.div>
          </div>

          <motion.div className="relative" variants={imageVariants}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
              <Image
                src="/images/authimage.png"
                alt="Student learning on a laptop"
                width={800}
                height={600}
                className="object-cover w-full h-full"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="p-4 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Currently Learning</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Web Development Fundamentals</p>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                        <div
                          className="h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!isMobile && (
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center">
            
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">$Free</p>
                </div>
              </div>
            )}

            {!isMobile && (
              <div className="absolute -bottom-8 -left-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 ring-2 ring-white dark:ring-gray-800"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Join 50,000+ learners</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

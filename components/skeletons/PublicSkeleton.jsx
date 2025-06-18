"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Skeleton = ({ className = "", ...props }) => {
  return <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`} {...props} />
}

const SkeletonText = ({ lines = 1, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"}`} />
      ))}
    </div>
  )
}

export default function PublicCourseDetailsSkeleton() {
  const shimmerVariants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section Skeleton */}
      <motion.section
        className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* Category Badge */}
                <Skeleton className="h-6 w-32 bg-emerald-500/30" />

                {/* Title */}
                <Skeleton className="h-12 w-full bg-white/20" />
                <Skeleton className="h-12 w-3/4 bg-white/20" />

                {/* Description */}
                <div className="space-y-2 mt-6">
                  <Skeleton className="h-6 w-full bg-white/15" />
                  <Skeleton className="h-6 w-5/6 bg-white/15" />
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 bg-white/20" />
                    <Skeleton className="h-5 w-16 bg-white/20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 bg-white/20" />
                    <Skeleton className="h-5 w-20 bg-white/20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 bg-white/20" />
                    <Skeleton className="h-5 w-16 bg-white/20" />
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4 mt-6">
                  <Skeleton className="w-12 h-12 rounded-full bg-white/20" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32 bg-white/20" />
                    <Skeleton className="h-4 w-40 bg-white/15" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enrollment Card Skeleton */}
            <div className="lg:col-span-1">
              <Card className="bg-white dark:bg-gray-800 shadow-xl">
                <CardContent className="p-6">
                  {/* Video Thumbnail */}
                  <div className="relative mb-4">
                    <Skeleton className="w-full h-48 rounded-lg" />
                    <Skeleton className="absolute inset-0 m-auto w-16 h-16 rounded-full" />
                  </div>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <Skeleton className="h-4 w-32 mx-auto" />
                  </div>

                  {/* Enroll Button */}
                  <Skeleton className="w-full h-12 mb-4 rounded-md" />

                  {/* Features */}
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded-full" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              {/* Tabs Navigation */}
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" disabled>
                  <Skeleton className="h-4 w-16" />
                </TabsTrigger>
                <TabsTrigger value="curriculum" disabled>
                  <Skeleton className="h-4 w-20" />
                </TabsTrigger>
                <TabsTrigger value="instructor" disabled>
                  <Skeleton className="h-4 w-18" />
                </TabsTrigger>
                <TabsTrigger value="reviews" disabled>
                  <Skeleton className="h-4 w-16" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                {/* What you'll learn */}
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-40" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Skeleton className="w-5 h-5 rounded-full mt-0.5 flex-shrink-0" />
                          <Skeleton className="h-4 flex-1" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Course Description */}
                <Card className="mt-6">
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                  </CardHeader>
                  <CardContent>
                    <SkeletonText lines={4} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-44" />
                    <Skeleton className="h-4 w-64" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                          <div className="space-y-2">
                            {Array.from({ length: 4 }).map((_, j) => (
                              <div key={j} className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4" />
                                <Skeleton className="h-4 flex-1" />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <Skeleton className="w-24 h-24 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-5 w-64 mb-4" />

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="text-center">
                              <Skeleton className="h-6 w-12 mx-auto mb-1" />
                              <Skeleton className="h-4 w-16 mx-auto" />
                            </div>
                          ))}
                        </div>

                        <SkeletonText lines={3} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-36" />
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-5 h-5" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start gap-4">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Skeleton className="h-5 w-24" />
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, j) => (
                                    <Skeleton key={j} className="w-4 h-4" />
                                  ))}
                                </div>
                                <Skeleton className="h-4 w-20" />
                              </div>
                              <SkeletonText lines={2} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <Skeleton className="h-6 w-28" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-5 h-5" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CourseDetailsSkeleton() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        {/* Back button skeleton */}
        <div>
          <Button variant="ghost" className="pl-0" disabled>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </div>

        {/* Course header skeleton */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="w-full">
            {/* Badge skeletons */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted"></div>
              <div className="h-6 w-16 animate-pulse rounded-full bg-muted"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="mt-2 h-9 w-3/4 animate-pulse rounded-md bg-muted"></div>
            
            {/* Course meta info skeletons */}
            <div className="mt-2 flex flex-wrap items-center gap-6">
              {/* Instructor skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
                <div>
                  <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                  <div className="mt-1 h-3 w-32 animate-pulse rounded bg-muted"></div>
                </div>
              </div>
              
              {/* Rating skeleton */}
              <div className="flex items-center gap-1">
                <div className="h-4 w-20 animate-pulse rounded bg-muted"></div>
              </div>
              
              {/* Date skeleton */}
              <div className="flex items-center gap-1">
                <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
              </div>
              
              {/* Duration skeleton */}
              <div className="flex items-center gap-1">
                <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
              </div>
            </div>
          </div>
          
          {/* Action buttons skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-28 animate-pulse rounded-md bg-muted"></div>
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted"></div>
          </div>
        </div>

        {/* Course content skeleton */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* About course skeleton */}
            <Card>
              <CardHeader>
                <div className="h-6 w-40 animate-pulse rounded bg-muted"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                  <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                  <div className="h-4 w-5/6 animate-pulse rounded bg-muted"></div>
                  <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course preview card skeleton */}
          <div>
            <Card className="sticky top-4">
              <CardHeader className="pb-4">
                <div className="h-6 w-32 animate-pulse rounded bg-muted"></div>
              </CardHeader>
              <div className="aspect-video w-full animate-pulse bg-muted"></div>
              <CardContent className="pt-6">
                <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lessons section skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-32 animate-pulse rounded bg-muted"></div>
            <div className="h-9 w-36 animate-pulse rounded-md bg-muted"></div>
          </div>
          
          {/* Lesson items skeleton */}
          {[1, 2, 3].map((index) => (
            <Card key={index} className="w-full">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
                    <div>
                      <div className="h-5 w-48 animate-pulse rounded bg-muted"></div>
                      <div className="mt-1 h-4 w-24 animate-pulse rounded bg-muted"></div>
                    </div>
                  </div>
                  <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
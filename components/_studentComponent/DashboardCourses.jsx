'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios';
import { LoaderPinwheel,  Users2 } from 'lucide-react';
import Link from 'next/link';

import timeAgo from '@/lib/timeAgo';

export default function DashboardCourses() {
    const [courses, setCourses] = useState([]);
    const [enroll, setEnroll]= useState([]);
     const [loading, setLoading] = useState(false);
        const [hasFetched, setHasFetched] = useState(false);

        const checkDashboard = async () => {
            setLoading(true);
            try {
                
              const [enrollRes, courseRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enroll/user`, {
                    withCredentials: true,
                }),
                  axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/all-courses`,
                     { withCredentials: true })
            
                ])

                setCourses(courseRes.data.course);
            setEnroll(enrollRes.data.data);

              
              } catch (error) {
                //console.error("Error fetching dashboard data:", error);
              }finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            if (!hasFetched) {
                checkDashboard();
                setHasFetched(true); 
            }
        }, [ hasFetched]); 
    
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    <Card className="col-span-4 border-l-4 border-l-emerald-600">
      <CardHeader>
        <CardTitle>Enrolled Courses</CardTitle>
        <CardDescription>Latest courses you enrolled in</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="flex text-sm text-muted-foreground">
              <LoaderPinwheel className='animate-spin mr-2 w-4 h-4' />Loading...</p>
          </div>
        ):!loading && enroll.length === 0 ? (
        <div className="flex items-center justify-center h-32">
            <p className="text-sm text-muted-foreground">You haven't enrolled in any course</p>
          </div>
      ): null}
      <div className="space-y-6">
      {enroll.slice(0,5).map((item,i) => (
        
        <div key={item.id|| i} className="space-y-8">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">{item.course.title}</p>
                <Link href={`/student/coursedetails/${item.course.id}`}>
                <p className="text-sm text-muted-foreground">{item.instructorName}</p>
                </Link>
              </div>
            </div>
            <div className="ml-auto font-medium">{timeAgo(item.createdAt)}</div>
          </div>
         
              
          
            
        </div>
      ))}
        </div>
      </CardContent>
    </Card>
    <Card className="col-span-4 md:col-span-3 lg:col-span-3">
      <CardHeader>
        <CardTitle>Popular Courses</CardTitle>
        <CardDescription>Most enrolled courses this month</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
           <p className="flex text-sm text-muted-foreground">
              <LoaderPinwheel className='animate-spin mr-2 w-4 h-4' />Loading...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-sm text-muted-foreground">No courses available</p>
          </div>
        ) : null}
        <div className="space-y-6">
            {courses.slice(0,5).map((course) => ( 
                
                <div key={course.id} >
                
                <Link href={`/student/coursedetails/${course.id}`} >
                    <div  className="flex items-center">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{course.title}</p>
                        <p className="text-sm text-muted-foreground">{'90'} students</p>
                    </div>
                       {course.enrollments.map((enrollment) => (
                        <div key={enrollment.id} className="ml-auto">{enrollment.progress}%</div>
                    ))}
                </div>
                
                </Link>
                
                </div>
              
              
            ))}
         
          
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

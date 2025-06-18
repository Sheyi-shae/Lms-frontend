'use client'
import { useAuth } from '@/context/authContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import CountUp from 'react-countup';
import { CheckCircle2, Gauge, BookOpenCheck, Award } from "lucide-react";


export default function DcardsStudents() {
  const [enroll, setEnroll] = useState([]);
    const [certificate, setCertificate] = useState([]);
    const[totalLesson, setTotalLesson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const { user } = useAuth();
    
    

    const checkDashboard = async () => {
        setLoading(true);
        try {
            
           const [enrollRes, certRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enroll/user`, {
        withCredentials: true,
        
      }),
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certificate/all`, {
        withCredentials: true,
     
      }),
    ]);

    setEnroll(enrollRes.data.data);
    setTotalLesson(enrollRes.data.totalLessons);
    setCertificate(certRes.data.count);
            

         
        } catch (error) {
            
            console.error("Error fetching dashboard data:", error);
        
        }finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id && !hasFetched) {
            checkDashboard();
            setHasFetched(true); 
        }
    }, [user, hasFetched]); 


    //calculate progress of all courses user enrolled in
    const calculateProgress = () => {
    if (!Array.isArray(enroll) || enroll.length === 0) return 0;

    const totalProgress = enroll.reduce((acc, course) => {
        const progress = typeof course.progress === "number" ? course.progress : 0;
        return acc + progress;
    }, 0);

    const average = totalProgress / enroll.length;

    return Math.round(Math.min(100, Math.max(0, average)));
};

    
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {/* Enrolled Courses */}
    <Card className={'border-l-4 border-l-emerald-600'}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
        <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <div className="animate-pulse bg-gray-300 h-6 w-24 rounded" />
          ) : (
            <CountUp end={enroll?.length} duration={2.5} separator="," />
          )}
        </div>
        <p className="text-xs text-muted-foreground">+2 from last month</p>
      </CardContent>
    </Card>

    {/* Completed Lessons */}
    <Card className={'border-l-4 border-l-emerald-600'}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <div className="animate-pulse bg-gray-300 h-6 w-24 rounded" />
          ) : (
            <CountUp end={totalLesson} duration={2.5} separator="," />
          )}
        </div>
        <p className="text-xs text-muted-foreground">Keep it up!</p>
      </CardContent>
    </Card>

    {/* Certificates */}
    <Card className={'border-l-4 border-l-emerald-600'}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
        <Award className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <div className="animate-pulse bg-gray-300 h-6 w-24 rounded" />
          ) : (
            <CountUp end={certificate} duration={2.5} separator="," />
          )}
        </div>
        <p className="text-xs text-muted-foreground">Nice achievements!</p>
      </CardContent>
    </Card>

    {/* Progress */}
    <Card className={'border-l-4 border-l-emerald-600'}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
        <Gauge className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
       <div className="text-2xl font-bold">
          {loading ? (
            <div className="animate-pulse bg-gray-300 h-6 w-24 rounded" />
          ) : (
            <CountUp end={calculateProgress()} duration={2.5} separator="," suffix="%" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">Across all courses</p>
      </CardContent>
    </Card>
  </div>
  )
}

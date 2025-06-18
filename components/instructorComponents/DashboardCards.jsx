'use client'
import { useAuth } from '@/context/authContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, LineChart, Users } from "lucide-react";
import { toast } from 'react-toastify';
import CountUp from 'react-countup';
import { set } from 'react-hook-form';

export default function DashboardCards() {
    const [courses, setCourses] = useState([]);
    const [subscribers, setSubscribers] = useState(null);
    const[totalLesson, setTotalLesson] = useState(null);

    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const { user } = useAuth();
    
    

    const checkDashboard = async () => {
        setLoading(true);
        try {
            const [courseRes, enrollRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/mycourse/${user.id}`, {
                    withCredentials: true
                }),
                 axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enroll/instructor`, {
                    withCredentials: true,
                }),
            ]);

            setCourses(courseRes.data.courses);
            setTotalLesson(enrollRes.data.totalLessons);
          
           setSubscribers(enrollRes.data.data);
          

          

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
       
        } finally {
            setLoading(false);
        }
    

            

         
    };

    useEffect(() => {
        if (user?.id  && !hasFetched   ) {
            checkDashboard();
            setHasFetched(true); 
        }
    }, [user, hasFetched]); 
      //calculate the entire progress from user enrollments
            const enroll =subscribers || [];
            
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
        <div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? (
                                <div className="animate-pulse bg-muted h-6 w-24 rounded"></div>) : (
                        <CountUp end={courses.length } duration={2.5} separator="," />)}
                        </div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         {loading ? (
                                <div className="animate-pulse bg-muted h-6 w-24 rounded"></div>)
                                 : (
                         <div className="text-2xl font-bold">
                        <CountUp end={totalLesson} duration={2.5} separator="," />
                        </div>
                        )}
                       
                       
                        <p className="text-xs text-muted-foreground">+12 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                                <div className="animate-pulse bg-muted h-6 w-24 rounded"></div>)
                                 : (
                         <div className="text-2xl font-bold">
                        <CountUp end={subscribers?.length} duration={2.5} separator="," />
                        </div>
                        )}
                       
                        <p className="text-xs text-muted-foreground">+18% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                                <div className="animate-pulse bg-muted h-6 w-24 rounded"></div>)
                                 : (
                         <div className="text-2xl font-bold">
                        <CountUp end={calculateProgress()} duration={2.5} separator="," />%
                        </div>
                        )}
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
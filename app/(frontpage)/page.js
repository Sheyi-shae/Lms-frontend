"use client"

import HomeTabsContent from "@/components/HomeTabsContent";

import HeroSection from "@/components/HeroSection";
import CoursesSection from "@/components/FrontpageCourses";
import axios from "axios";
import {  useEffect, useState } from "react";
import SelectInterests from "@/components/_studentComponent/SelectInsterests";
import { useAuth } from "@/context/authContext";
import { set } from "react-hook-form";
import RecommendedCourses from "@/components/RecommendedCourses";



export default function Home() {
  const [courses, setCourses] = useState([]);
  const [interestCourses, setInterestCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false)
  const {user,loading:userLoading}=useAuth()

 
  //resposive for showing the interest dialog
 
  useEffect(() => {
    if (!userLoading && user?.isVerified && user?.role === "student" && user?.selectedInterest === false) {
      setIsOpen(true)
    }
  }, [user, userLoading])

  
  //fetch all courses from the database
  const fetchCourses = async () => {
  setLoading(true);
  try {
    const [courseRes, interestRes] = await Promise.allSettled([
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/all-courses/public`, {
        withCredentials: true,
      }),
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/interests/courses`, {
        withCredentials: true,
      }),
    ]);

    if (courseRes.status === 'fulfilled') {
      setCourses(courseRes.value.data.course);
    } else {
     // console.error('Failed to fetch all courses:', courseRes.reason);
    }

    if (interestRes.status === 'fulfilled') {
      setInterestCourses(interestRes.value.data.data);
    } else {
     // console.error('Failed to fetch interest-based courses:', interestRes.reason);
    }
  } catch (error) {
    //console.error('Unexpected error:', error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCourses();
  }, []); 


 

  return (
    <div className=" min-h-screen">
      
      <HeroSection/>
      {!userLoading && <SelectInterests 
      isOpen={isOpen} setIsOpen={setIsOpen} />}


      { interestCourses && <RecommendedCourses courses={interestCourses} loading={loading} />}
      <CoursesSection courses={courses} loading={loading}/>

      {/* tabs */}
      <HomeTabsContent course={courses} loading={loading} />
      {/* end of tabs */}
    </div>
  );
}

"use client"

import HomeTabsContent from "@/components/HomeTabsContent";

import HeroSection from "@/components/HeroSection";
import CoursesSection from "@/components/FrontpageCourses";
import axios from "axios";
import {  useEffect, useState } from "react";



export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch all courses from the database
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/all-courses/public`, {
        withCredentials: true,
      });
      setCourses(res.data.course);
    }
    catch (error) {
    
    } finally {
      setLoading(false);
    }
    

  }


  useEffect(() => {
    fetchCourses();
  }, []); 


 

  return (
    <div className=" min-h-screen">
      
      <HeroSection/>
      <CoursesSection courses={courses} loading={loading}/>

      {/* tabs */}
      <HomeTabsContent course={courses} loading={loading} />
      {/* end of tabs */}
    </div>
  );
}

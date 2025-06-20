'use client'

import React, { useEffect, useState, useMemo } from 'react';
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

import { Search, Filter, ShieldAlert, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { StudentCourseCard } from "@/components/_studentComponent/StudentCourseCard";
import { StudentCourseCardSkeleton } from "@/components/CourseCardSkeleton";
import { Pagination } from "@/components/Pagination";
import HeaderTitle from '@/components/_studentComponent/HeaderTitle';
import EnrollmentCourseCard from '@/components/_studentComponent/EnrollmentCard';
import InstructorEnrollment from '@/components/instructorComponents/InstructorEnrollment';

// Number of courses to display per page
const ITEMS_PER_PAGE = 6;



export default function Page() {
  // State variables
  const [enrollments, setEnrollments] = useState([]); // All courses from API
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [filterCategory, setFilterCategory] = useState("all"); // Selected filter category

  // Get current page number from URL query (e.g., ?page=2)
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const [totalLessons,setTotalLessons] = useState("")

  // Fetch all courses from the backend on component mount
  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enroll/instructor`,
          { withCredentials: true }
        );
        setEnrollments(res.data.data || []);
        setTotalLessons(res.data.totalLessons)
        
      } catch (err) {
       // console.error("Error fetching courses:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchEnrollment();
  }, []);

  // Filter courses based on search query and selected category
 
  const courses = enrollments.map((enrollment) => enrollment.course); // Extract course data from enrollments

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    
      return matchesSearch 
    });
  }, [courses, searchQuery, filterCategory]);

  // Calculate total pages from filtered courses
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  // Slice the filtered courses for current page display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">

      <HeaderTitle
      head={'Progress Tracker'}
        text={'Tracker your students progress'}
        className={"w-full bg-emerald-600 hover:bg-emerald-700 md:w-auto"}
        icon={<History className='w-4 h-4' />}/>

        {/* Search input and category filter dropdown */}
        <div className="grid gap-4 md:grid-cols-[1fr_200px]">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses you enrolled in..."
              className="pl-10"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Display loading skeletons while fetching data */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill(null).map((_, i) => (
              <StudentCourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Show filtered results if available */}
            {filteredCourses.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {currentCourses.map(course => {
  const enrollment = enrollments.find(enr => enr.course.id === course.id);
  const progress = enrollment?.progress || 0;
  const instructorName = enrollment?.instructorName
  const studentName = enrollment?.student.name;
  const completedLessons = enrollment?.completedLessons.length || 0;
  return (
    <InstructorEnrollment
      key={course.id} 
      course={course} 
      studentName={studentName}
      progress={progress} 
      instructorName={instructorName}
      completedLessons={completedLessons}
      totalLessons={totalLessons}
    />
  );
})}
                </div>

                {/* Pagination below courses */}
                <div className="flex justify-center mt-6">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    baseUrl="/student/courses"
                  />
                </div>
              </>
            ) : (
             
              <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-700">You haven't enrolled in any course</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

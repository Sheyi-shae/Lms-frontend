'use client'

import React, { useEffect, useState, useMemo } from 'react';

import { useSearchParams } from 'next/navigation';
import axios from 'axios';

import {  History } from "lucide-react";
import { StudentCourseCardSkeleton } from "@/components/CourseCardSkeleton";
import { Pagination } from "@/components/Pagination";
import HeaderTitle from '@/components/_studentComponent/HeaderTitle';
import ProgressTracker from '@/components/_studentComponent/ProgressTrackere';
import TrackerTabs from '@/components/_studentComponent/TrackerTabs';

// Number of courses to display per page
const ITEMS_PER_PAGE = 6;

// List of available categories for the filter dropdown
const CATEGORY_OPTIONS = [
  { label: "All Categories", value: "all" },
  { label: "Development", value: "development" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Data Science", value: "data-science" },
  { label: "Photography", value: "photography" },
];

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enroll/user`,
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
      const matchesCategory = filterCategory === "all" || course.category === filterCategory;
      return matchesSearch && matchesCategory;
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
        text={'Track your progress in the courses you enrolled in.'}
        className={"w-full bg-emerald-600 hover:bg-emerald-700 md:w-auto"}
        icon={<History className='w-4 h-4' />}/>
        


        <TrackerTabs
    loading={loading}
    filteredCourses={filteredCourses}
    currentCourses={currentCourses}
    enrollments={enrollments}
    totalPages={totalPages}
    currentPage={currentPage}
    totalLessons={totalLessons}

    
    
    />
      </div>
    </div>
  );
}

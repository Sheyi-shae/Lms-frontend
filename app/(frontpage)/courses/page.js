'use client'

import React, { useEffect, useState, useMemo } from 'react';
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

import { Search, Filter, ShieldAlert } from "lucide-react";
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
import Courses from './Courses';



// Number of courses to display per page
const ITEMS_PER_PAGE = 12


export default function page() {
    
    const [courses, setCourses] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchQuery, setSearchQuery] = useState(""); 
    const [filterCategory, setFilterCategory] = useState("all"); 
    const [categories, setCategories] = useState([]); 
  
      // Get current page number from URL query (e.g., ?page=2)
      const searchParams = useSearchParams();
      const pageParam = searchParams.get('page');
      const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
    
      // Filter courses based on search query and selected category
      const filteredCourses = useMemo(() => {
        return courses.filter(course => {
          const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = filterCategory === "all" || course.category.name === filterCategory;
          return matchesSearch && matchesCategory;
        });
      }, [courses, searchQuery, filterCategory]);


      // Calculate total pages from filtered courses
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  // Slice the filtered courses for current page display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const fetchCredentials = async () => {
  setLoading(true);
  // Fetch courses and categories concurrently

  const [courseResult, categoryResult] = await Promise.allSettled([
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/all-courses/public`, {
      withCredentials: true,
    }),
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`, {
      withCredentials: true,
    }),
  ]);

  if (courseResult.status === "fulfilled") {
    setCourses(courseResult.value.data.course);
  } else {
    console.warn("Failed to fetch courses:", courseResult.reason);
    setCourses([]);
  }

  if (categoryResult.status === "fulfilled") {
    setCategories(categoryResult.value.data.data);
  } else {
    console.warn("Failed to fetch categories:", categoryResult.reason);
    setCategories([]);
  }

  setLoading(false);
};

  useEffect(() => {
    
      fetchCredentials();
     
  }, [ ]);

  return (
    <div className="container py-10">
          <div className="flex flex-col gap-8">
    
           <div
          className="text-center"
          
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white"> Courses</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-300">
            Discover our available courses taught by industry experts and loved by thousands of students.
          </p>
        </div>
             
        
              
    
            {/* Search input and category filter dropdown */}
            <div className="grid gap-4 md:grid-cols-[1fr_200px]">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-10"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
    
              {/* Category filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                   <SelectItem value="all">All Categories</SelectItem>
                                   {categories.map((category) => (
                                     <SelectItem key={category.id} value={category.name}>
                                       {category.name}
                                     </SelectItem>
                                   ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
    
            {/* Display loading skeletons while fetching data */}
          {loading ? (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {Array(6)
      .fill(null)
      .map((_, i) => (
        <StudentCourseCardSkeleton key={i} />
      ))}
  </div>
) : filteredCourses.length > 0 ? (
  <>
    <Courses courses={currentCourses} />

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
    <p className="text-lg font-semibold text-gray-700">No courses found</p>
  </div>
)}

          </div>
        </div>
  )
}

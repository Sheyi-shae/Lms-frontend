'use client'
import Link from "next/link"
import { PlusCircle, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CourseCard } from "@/components/instructorComponents/CourseCard"
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { useAuth } from '@/context/authContext';
import { StudentCourseCardSkeleton } from "@/components/CourseCardSkeleton"
import { useSearchParams } from "next/navigation"
import { Pagination } from "@/components/Pagination"


export default function page() {
  
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(false);
 const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
   const [searchQuery, setSearchQuery] = useState(""); // Search input
    const [filterCategory, setFilterCategory] = useState("all"); // Selected filter category
  
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
      const ITEMS_PER_PAGE = 6;
    
      // Calculate total pages from filtered courses
      const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
    
      // Slice the filtered courses for current page display
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const currentCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const fetchCredentials = async () => {
  setLoading(true);

  const [courseResult, categoryResult] = await Promise.allSettled([
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/mycourse/${user.id}`, {
      withCredentials: true,
    }),
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`, {
      withCredentials: true,
    }),
  ]);

  if (courseResult.status === "fulfilled") {
    setCourses(courseResult.value.data.courses);
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
    if (user) {
      fetchCredentials();
      }
  }, [ ]);
  


    
 
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground">Browse your published courses</p>
          </div>
          <Link href="/instructor/courses/create">
            <Button  className="bg-cyan-700 w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
             value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..." className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select  value={filterCategory} onValueChange={setFilterCategory}>
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

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {Array(6).fill(null).map((_, i) => (
                        <StudentCourseCardSkeleton key={i} />
                      ))}
                    </div>
        ):

        filteredCourses.length  > 0 ? (

          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

             <div className="flex justify-center mt-6">
                              <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                baseUrl="/instructor/courses/my_courses"
                              />
                            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-700">You haven't published any course</p>
              </div>

        )}
      </div>
    </div>
  )
}


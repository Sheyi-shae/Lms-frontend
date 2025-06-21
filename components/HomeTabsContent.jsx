"use client";
import { useEffect, useState } from "react";
import { HomeTabs } from "./HomeTabs";
import axios from "axios";
import CoursesByCategory from "./CoursesByCategory";

export default function HomeTabsContent({course,loading: initialLoading}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`,
        { withCredentials: true }
      );
      setCategories(res.data.data);
    } catch (error) {
      //console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  

    //filter courses by category name
  const filterCoursesByCategory = (categoryName) => {
    if (categoryName === "all") {
      return course;
    }
    return course.filter(course => course.category.name.toLowerCase() === categoryName.toLowerCase());
  };

  const tabs = categories?.map((category) => ({
    title: category?.name,
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          <CoursesByCategory
          categoryName={category.name}
          courses={filterCoursesByCategory(category.name)}
          loading={initialLoading}
          />

          
        </h2>
        {/* Additional content can be added here */}
      </div>
    ),
  }));
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Trending Courses</h1>

      {loading ? (
        <p>Loading categories...</p>
      ) : categories.length > 0 ? (
        <HomeTabs
          tabClassName="flex overflow-x-auto gap-2 w-full h-16 bg-slate-50 whitespace-nowrap scrollbar-hide"

          tabs={tabs}
         
        />
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}

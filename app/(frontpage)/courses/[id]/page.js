"use client";
import PublicCourseDetails from '@/components/PublicCourseDetails'
import PublicCourseDetailsSkeleton from '@/components/skeletons/PublicSkeleton';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {
    const {id}= useParams();

    
     const [loading, setLoading] = useState(false);
      const [course, setCourse] = useState(null);
      
    
      async function fetchCourse() {
        if (!id) return;
    
        try {
          setLoading(true);
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/public/${id}`,
            {withCredentials: true}
          );
          setCourse(res.data.course);
          
          console.log(res.data.course);
        } catch (err) {
          console.error("Error fetching course:", err);
        } finally {
          setLoading(false);
        }
      }
    
      useEffect(() => {
        if (id) {
          fetchCourse();
        }
      }, [id]); 
    
  return (
    <div>
        {loading ? (
            <PublicCourseDetailsSkeleton/>

        ): (
        <>
          {course && <PublicCourseDetails course={course} />}
           </> 

        )}
        
    </div>
  )
}

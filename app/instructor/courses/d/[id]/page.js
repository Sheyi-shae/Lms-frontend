"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MyCourseDetails from "@/components/instructorComponents/MyCourseDetails";
import { toast } from "react-toastify";
import axios from "axios";
import CourseDetailsSkeleton from "@/components/skeletons/CoursedetailsSkeleton";

export default function Page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState(null);
const [hasFetched, setHasFetched] = useState(false);

  async function fetchCourse() {
    if (!id) return;
    setLoading(true);

    try {
      

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/${id}`,
         { withCredentials: true });
         setCourse(res.data.course);
        
         //console.log(res.data.course)

    } catch (err) {
      toast.error("Error fetching course data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (id && !hasFetched) {
      fetchCourse();
      setHasFetched(true);
    }
    
  }, [id, hasFetched,course]);
  


 


  return (
    <div>
      
          {loading ? (
           <CourseDetailsSkeleton/>
          ) : (
            <>
            
            {course && <MyCourseDetails course={course} />
          }</>
          )}
        </div>
  );


}

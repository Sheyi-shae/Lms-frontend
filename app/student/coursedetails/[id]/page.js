"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CourseDetails from "@/components/_studentComponent/CourseDetails";
import CourseDetailsSkeleton from "@/components/skeletons/CoursedetailsSkeleton";
import { useAuth } from "@/context/authContext";

export default function Page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const {loading:userLoading,user}=useAuth()
  

  async function fetchCourse() {
    if (!id) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/${id}`,
        { withCredentials: true }
      );
      setCourse(res.data.course);
      console.log(res.data.course);
    } catch (err) {
      toast.error("Error fetching course data. Please try again later.");
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
       <CourseDetailsSkeleton/>
      ) : (
        <>
        
        {course && <CourseDetails 
        course={course} 
        userLoading={userLoading}
        user={user}
        />}
        </>
      )}
    </div>
  );
}

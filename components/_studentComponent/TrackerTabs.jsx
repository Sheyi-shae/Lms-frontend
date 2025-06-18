import React from 'react'
import { HomeTabs } from '../HomeTabs'
import ProgressTracker from './ProgressTrackere';
import { Pagination } from '../Pagination';
import { StudentCourseCardSkeleton } from '../CourseCardSkeleton';

export default function TrackerTabs({
    filteredCourses,
        loading,
        currentCourses,
        enrollments,
        totalPages,
        currentPage,
        totalLessons}){
            const inProgressCourses = filteredCourses.filter(course => {
  const enrollment = enrollments.find(enr => enr.course.id === course.id);
  return enrollment && enrollment.progress < 100;
});

const completedCourses = filteredCourses.filter(course => {
  const enrollment = enrollments.find(enr => enr.course.id === course.id);
  return enrollment && enrollment.progress === 100;
});


//function to render the course list
// This function takes an array of courses and returns a JSX element

const renderCourseList = (courses) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {courses.map(course => {
      const enrollment = enrollments.find(enr => enr.course.id === course.id);
      const progress = enrollment?.progress || 0;
      const instructorName = enrollment?.instructorName;
      const completedLessons = enrollment?.completedLessons.length || 0;

      return (
        <ProgressTracker
          key={course.id}
          course={course}
          progress={progress}
          instructorName={instructorName}
          completedLessons={completedLessons}
          totalLessons={totalLessons}
        />
      );
    })}
  </div>
);


  return (
    <div>
        <HomeTabs
              tabClassName="grid w-full grid-cols-2 lg:w-auto  h-12 bg-slate-50 "
                tabs={[
                  {
                    title: "In Progress",
                    content: (
                       <>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill(null).map((_, i) => (
              <StudentCourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
         
            {/* Show filtered results if available */}
            {inProgressCourses.length > 0 ? (
              
                <>
                 {renderCourseList(inProgressCourses)}

       
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
                 <p className="text-lg font-semibold text-gray-700">You have no course in progress</p>
              </div>
            )}
          </>
        )}
        </>
                    ),
                  },


                //   sencond tab
                  {
                    title: "Completed",
                    content: (
                      <>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill(null).map((_, i) => (
              <StudentCourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
         
            {/* Show filtered results if available */}
            {completedCourses.length > 0 ? (
              
                <>
                    {renderCourseList(completedCourses)}
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
                <p className="text-lg font-semibold text-gray-700">You haven't completed any course</p>
              </div>
            )}
          </>
        )}
        </>
                    ),
                  },
                 
                 
                ]}
              />
    </div>
  )
}

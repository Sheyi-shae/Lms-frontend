
import DcardsStudents from "@/components/_studentComponent/DcardsStudents"
import DashboardCourses from "@/components/_studentComponent/DashboardCourses"
import DashboardQuickAction from "@/components/_studentComponent/DashboardQuickAction"
import Certificate from "@/components/_studentComponent/certificate"



export default function StudentDashboard() {
  
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <DcardsStudents/>
     
        {/* popular courses here */}
        <DashboardCourses/>
        {/* quick actins */}
        <DashboardQuickAction/>


      
      
    </div>
  )
}



import Link from "next/link"
import { BookOpen, GraduationCap, LineChart, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardCards from "@/components/instructorComponents/DashboardCards"
import DashboardDetails from "@/components/instructorComponents/DashboardDetails"
import InstructorQuickAction from "@/components/instructorComponents/InstructorQuickActions"



export default function InstructorDashboard() {
  
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <DashboardCards/>
      <DashboardDetails/>
    <InstructorQuickAction/>
    </div>
  )
}


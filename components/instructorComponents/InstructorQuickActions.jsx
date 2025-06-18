import Link from "next/link"
import { BookOpen, GraduationCap, LineChart, Search, Users, Users2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function InstructorQuickAction() {
  return (
    <div className="grid gap-4 grid-cols-1">
        <Card className={'border-l-4 border-l-cyan-600'}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/intructor/course_performance">
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer h-full">
                  <BookOpen className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">My students</span>
                </div>
              </Link>
              <Link href="/intructor/courses/my_courses">
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer h-full">
                  <GraduationCap className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">My Courses</span>
                </div>
              </Link>
              <Link href="/intructor/courses/my_courses">
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer h-full">
                  <Search className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">My Courses</span>
                </div>
              </Link>
              <Link href="/intructor/profile">
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer h-full">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">My Profile</span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

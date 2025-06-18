import Link from "next/link"
import { Star, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


export function StudentCourseCard({ course }) {
  return (
    <Card className="overflow-hidden flex flex-col border-l-4 border-l-emerald-600 h-full transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={course.imageUrl || "/placeholder.svg"}
          alt={course.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-normal">
            {course.category.name}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
            <span>{course.rating || '4.7'}</span>
          </div>
        </div>
        <Link href={`d/${course.id}`}><CardTitle className="line-clamp-1 text-xl">{course.title}</CardTitle></Link>
        <div className="text-sm text-muted-foreground">by {course.instructor?.name }</div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <CardDescription className="line-clamp-3">{course.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-1 h-4 w-4" />
          {/* <span>{course.students.toLocaleString()} students</span> */}
        </div>
        <Link href={`/student/coursedetails/${course.id}`}>
          <Button variant="outline"  className='bg-emerald-600 text-slate-50' size="sm">
            Course Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}


"use client"


import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock,  LoaderPinwheel, Star,  User2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { dateConverter, } from "@/lib/dateConverter"


import { StudentLessonList } from "./StudentLessonList"




export default function CourseDetails({ course }) {

    const router = useRouter()
  

   
    return (

        
        <div className="container py-10">
            <div className="flex flex-col gap-8">
                {/* Back button */}
                <div>
                    <Link href="/student/courses">
                        <Button variant="ghost" className="pl-0">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Courses
                        </Button>
                    </Link>
                </div>

                {/* Course header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">{course?.category.name}</Badge>
                            <Badge variant="outline">{course?.level || '40%'}</Badge>
                        </div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight">{course?.title}</h1>
                        <div className="mt-2 flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2">
                                <User2 className="h-8 w-8" />
                                <div>
                                    <p className="text-sm font-medium">{course.instructor?.name }</p>
                                    <p className="text-xs text-muted-foreground">{course.instructor?.instructorTitle || 'Senior Software Developer'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                                <span className="text-sm font-medium">{course.rating || '4.7'}</span>
                                <span className="ml-1 text-sm text-muted-foreground">({course?.enrollments.length} students enrolled)</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Last updated:{dateConverter(course.updatedAt)} </span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{course.duration || '40 minutes'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* report cause */}

                        
                    </div>
                </div>

                {/* Course content */}
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-6">
                        {/* Course description */}
                        <Card className={'border-l-4 border-l-emerald-600'}>
                            <CardHeader>
                                <CardTitle>About This Course</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base leading-relaxed">{course.description}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* division two */}

                    <div>
                        <Card className="sticky top-4 border-l-4 border-l-emerald-600">
                            <CardHeader className="pb-4">
                                <CardTitle>Course Preview</CardTitle>
                            </CardHeader>
                            <div className="aspect-video w-full overflow-hidden">
                                <img
                                    src={course.imageUrl || "/placeholder.svg"}
                                    alt={course.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                           
                        </Card>
                    </div>
                </div>

              

                {/* Lessons section */}

                <Card className={'border-l-4 border-l-emerald-600'}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>{course.lessons.length} Lesson(s)</CardTitle>
                
                                    </div>
                                </CardHeader>

               {course.lessons.length > 0 ? (
                    <CardContent><StudentLessonList course={course} /></CardContent>
                            
                        
                ) : (
                    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                        <p className="text-lg font-semibold text-gray-700">No lessons available for this course</p>
                    </div>
                )}
                </Card>

            </div>
        </div>
    )
}


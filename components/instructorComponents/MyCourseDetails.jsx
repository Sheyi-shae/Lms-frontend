"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Edit, FileText, Plus, Star, Trash2, User2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { toast } from "react-toastify"
import { dateConverter } from "@/lib/dateConverter"

import LessonSection from "./LessonSection"
import DeleteAlert from "./DeleteAlert"


export default function MyCourseDetails({ course }) {

    const router = useRouter()

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)








    return (

        
        <div className="container py-10">
            <div className="flex flex-col gap-8">
                {/* Back button */}
                <div>
                    <Link href="/instructor/courses/my_courses">
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
                            <Badge variant="outline">{course?.category.name || 'web dev'}</Badge>
                            
                        </div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight">{course?.title}</h1>
                        <div className="mt-2 flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2">
                                <User2 className="h-8 w-8" />
                                <div>
                                    <p className="text-sm font-medium">{course.instructor?.name || 'seyi'}</p>
                                    <p className="text-xs text-muted-foreground">{course.instructor?.instructorTitle || 'Anonymous'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                                <span className="text-sm font-medium">{course.rating || '4.7'}</span>
                                <span className="ml-1 text-sm text-muted-foreground">({course?.enrollments?.length} students enrolled)</span>
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Course
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Course</DialogTitle>
                                    {/* <DialogDescription>Make changes to the course details here.</DialogDescription> */}
                                </DialogHeader>
                                <div className="py-4">
                                    <p className="text-sm text-red-700 ">
                                   You can't edit this course  at this time. Please contact support if you need to make changes to these fields.
                                    </p>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                    {/* <Button type="submit">Save changes</Button> */}
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* delete dialog */}
                        <DeleteAlert 
                        isDeleteDialogOpen={isDeleteDialogOpen} 
                        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                        courseId={course.id}
                        />
                    </div>
                </div>

                {/* Course content */}
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-6">
                        {/* Course description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About This Course</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base leading-relaxed">{course.description}</p>
                            </CardContent>
                        </Card>

                        {/* What you'll learn */}
                        {/* <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card> */}

                        {/* Requirements */}
                        {/* <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="text-sm">
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card> */}
                    </div>

                    {/* division two */}

                    <div>
                        <Card className="sticky top-4">
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
                <LessonSection course={course} />

            </div>
        </div>
    )
}


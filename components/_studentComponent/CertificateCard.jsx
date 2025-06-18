"use client"

import { useState } from "react"
import { Award, Calendar, CheckCircle, ChevronRight, Download, Eye } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { dateConverter } from "@/lib/dateConverter"
import { Badge } from "../ui/badge"
import Certificate from "./certificate"




export default function CertificateCard({ certificate}) {
    const [isHovering, setIsHovering] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)

 




  


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      
    >
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-emerald-600",
          isHovering ? "transform scale-[1.02]" : "",
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <CardHeader className="p-5 pb-2">
          <div className="flex items-center justify-between mb-1">
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1"
            >
              <CheckCircle className="h-3 w-3" />
              <span className="text-xs font-medium">Completed</span>
            </Badge>
            {/* {course?.category && (
              <Badge variant="secondary" className="text-xs">
                {certificate.course.category || "General"}
              </Badge>
            )} */}
          </div>

          <Link href={`/student/coursedetails/${certificate.course.id}`} className="group">
            <h3 className="line-clamp-2 text-xl font-semibold group-hover:text-emerald-700 transition-colors">
              {certificate.course.title}
            </h3>
          </Link>

          {certificate.course.instructor.name && <p className="text-sm text-muted-foreground mt-1">Instructor: {certificate.course.instructor.name}</p>}
        </CardHeader>

        <CardContent className="p-5 pt-2">
          <div className="mt-3 space-y-3">
            <div className="space-y-1">
             
              </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-emerald-600" />
              <span>Issued on {dateConverter(certificate.createdAt)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-2 flex flex-col  gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="default"
                  className="w-full sm:flex-1 bg-emerald-700 hover:bg-emerald-800 transition-all"
                >
                  <Link href={`/student/coursedetails/${certificate.course.id}`} className="flex items-center justify-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>Review Course</span>
                    <ChevronRight className="h-4 w-4 ml-1 opacity-70" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View course details and your progress</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-all"
                  onClick={() => setShowCertificate(true)}
                >
                  <Award className="h-4 w-4 mr-2" />
                  View Certificate
                  {isHovering && <Download className="h-3 w-3 ml-2 opacity-70" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View and download your certificate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      <Dialog open={showCertificate}  onOpenChange={setShowCertificate}>
           <DialogContent className="w-full  md:max-w-4xl p-0 h-[95vh] overflow-y-auto overflow-x-auto">

              <DialogTitle className="sr-only">
      View your certificate
    </DialogTitle>
          
    <Certificate 
      certId={certificate.certificateId}
      courseTitle={certificate.course.title}
      date={certificate.createdAt}
      instructorName={certificate.course.instructor.name}
      studentName={certificate.user.name}
      verificationURL={certificate.certificateUrl}
    />
  
       
       <Button className={'bg-green-800'}>Download</Button>
              <Button className={'bg-red-700'}>Print</Button>
            </DialogContent>
           
          </Dialog>
    </motion.div>
  )
}

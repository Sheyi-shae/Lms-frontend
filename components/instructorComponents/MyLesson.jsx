"use client"


import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, } from "@/components/ui/form";
import { Upload, X, Loader2, Plus, LoaderPinwheel } from "lucide-react";
import TextInput, { TextAreaInput } from "../re_usable/FormInput";
import axios from 'axios';
import { toast } from "react-toastify"

import { Clock, Edit, MoreVertical, Trash2, Video, FileText } from "lucide-react"


import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import LessonDelete from "./LessonDelete"
import UploadingFormButton from "./UploadingFormButton";

const formSchema = z.object({
    title: z.string(),
    content: z.string(),
    videoUrl: z.string().optional(),
    position: z.string().optional(),
});

export function MyLessonList({ lessons, onDeleteLesson, deleting }) {
    const [lessonToDelete, setLessonToDelete] = useState(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
     

    //states for updating lesson
        const [loading, setLoading] = useState(false)
        const [uploading, setUploading] = useState(false)
        const [mediaFile, setMediaFile] = useState(null)
        const [mediaPreview, setMediaPreview] = useState(null)
        const [useUrl,setUseUrl]=useState(false)
        const [previousLesson, setPreviousLesson] = useState(null)

    // Open delete dialog and set the lesson to be deleted
    const handleDeleteClick = (lessonId) => {
        setLessonToDelete(lessonId);
        setIsDeleteDialogOpen(true);
    };

    // Confirm delete and call the onDeleteLesson function
    const confirmDelete = () => {
        if (lessonToDelete) {
            onDeleteLesson(lessonToDelete); // Call the delete function passed as a prop
            setLessonToDelete(null); // Reset selected lesson
        }
        setIsDeleteDialogOpen(false);
    };

    // Set previous lesson data for editing

    useEffect(() => {
  if (isEditDialogOpen) {
    form.reset({
      title: previousLesson ? previousLesson.title : "",
                content: previousLesson ? previousLesson.content : "",
               
                position: previousLesson ? previousLesson.position :"",
                videoUrl:previousLesson ? previousLesson.videoUrl :"",
    });
  }
}, [isEditDialogOpen]);
    const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                title: previousLesson ? previousLesson.title : "",
                content: previousLesson ? previousLesson.content : "",
                videoUrl: previousLesson ? previousLesson.videoUrl : "",
                position: previousLesson ? previousLesson.position :""
            },
        });
  //fetch previous lesson
  const fetchPreviousLesson = async (lessonId) => {
   
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/lesson/${lessonId}`,
                {withCredentials: true});

                setPreviousLesson(response.data.data);
               // console.log("Fetched previous lesson:", response.data.data);
    
            } catch (error) {
          //  console.error("Error fetching previous lesson:", error);
            }finally {
           

            }
        }
    
    
    
    const openLessonModal = (lessonId) => {
       
        fetchPreviousLesson(lessonId);
       
            setIsEditDialogOpen(true)
        
        
    }

    //update lesson
     async function onSubmit(data) {
            let videoUrl = data.videoUrl;
            if (!mediaFile && !videoUrl && !previousLesson.videoUrl) {
      toast.error("Please upload a media file or provide a video URL.");
      return;
    }
    
    
            try {
                // Check if there's a media file to upload
                if(mediaFile) {
                setUploading(true);
    
                // Create FormData for file upload
                const formData = new FormData();
                formData.append("file", mediaFile);
    
    
                // Upload to Cloudinary
                const fileUpload = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
                    formData,
                    { withCredentials: true }
                );
                
                videoUrl = fileUpload.data.url;
    
                setUploading(false); 
                
            }
    
    
                setLoading(true);
                
                data = { ...data, videoUrl }
    
                const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/lesson/update/${previousLesson.id}`, data, {
                    withCredentials: true,
                });
               
    
    
                setLoading(false);
    
                toast.success(res.data?.message);
                setIsEditDialogOpen(false);
              //  console.log("Lesson updated successfully:", );
    
    
    
    
            } catch (error) {
    
                setLoading(false);
    
                const errorMessage = error.response?.data?.message ||
                    "Something went wrong. Please try again.";
    
                toast.error(errorMessage);
            }
        }

            //handle file selection
    function handleFileChange(e) {
        const file = e.target.files?.[0]
        if (!file) return

        setMediaFile(file)

    }
    function removeFile() {
        setMediaFile(null)
        setMediaPreview(null)
    }

    return (
        <div className="space-y-1">
            <Accordion type="single" collapsible className="w-full">
                {lessons.map((lesson, index) => (
                    <AccordionItem key={lesson.id} value={lesson.id}>
                        <div key={lesson.id} className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                    {/* {getLessonIcon(lesson.type)} */}
                                    <Video className="h-4 w-4 text-primary" />
                                </div>
                                <AccordionTrigger  className="hover:no-underline py-0">
                                    <div className="flex flex-col items-start text-left">
                                        <span className="text-sm font-medium">
                                            {index + 1}. {lesson.title}
                                        </span>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span>{lesson.type}</span>
                                            <span className="flex items-center">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {lesson.duration || 40} min
                                            </span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                            </div>
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => openLessonModal(lesson.id)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Lesson
                                        </DropdownMenuItem>
                                        <DropdownMenuItem disabled={deleting} onClick={() => handleDeleteClick(lesson.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete Lesson
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <AccordionContent className="pb-4 pt-0 pl-11">
                            <p className="text-sm text-muted-foreground mb-4">{lesson.content}</p>
                            
                        </AccordionContent>
                        {index < lessons.length - 1 && <Separator />}
                    </AccordionItem>
                ))}
            </Accordion>

           <LessonDelete 
           confirmDelete={ confirmDelete}
           isDeleteDialogOpen={isDeleteDialogOpen}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen} />


            {/* Edit dialog  */}
              
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="w-full md:max-w-3xl h-[80vh] p-0 overflow-y-scroll">
              <DialogTitle className="sr-only"> </DialogTitle>

               <div className="container mx-auto ">
                                          <Card>
              
                                              <CardContent>
                                                  <Form {...form}>
                                                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                                          {/* Email Field */}
              
                                                          <TextInput
                                                              form={form}
                                                              name="title"
                                                              type="text"
                                                              
                                                              label="Title" />
              
                                                          <TextAreaInput
                                                              form={form}
                                                              name="content"
                                                              placeholder="Describe what this entails..."
                                                              label="Content" />

                                                              <TextInput
                                                              form={form}
                                                              name="position"
                                                              type="number"
                                                              
                                                              label="Lesson Position" />
              
                                                          {/* media for course */}
                                                          <div className="space-y-3">
                                                              <div className="text-sm font-medium">Course Media</div>
                                                             
                                                              {useUrl ? (
                                                                  <>
                                                                  <TextInput
                                                                      form={form}
                                                                      name="videoUrl"
                                                                      type="text"
                                                                      placeholder="Enter video URL"
                                                                      label="Video URL" />
                                                                      <span className="text-sm text-muted-foreground">Input a valid VIDEO URL or <span className="bg-emerald-700 px-1 rounded-sm text-white hover:cursor-pointer" onClick={() => setUseUrl(!useUrl)}> click here</span> to upload a video</span>
                                                                      </>
                                                              ):(
                                                                  <>
              
                                                              {!mediaFile ? (
                                                                  <>
                                                                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                                                                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                                                      <p className="text-sm text-muted-foreground mb-1">Drag and drop your course thumbnail or video</p>
                                                                      <p className="text-xs text-muted-foreground mb-4">Supports: JPG, PNG, GIF, MP4 (max 50MB)</p>
                                                                      <Button
                                                                          type="button"
                                                                          variant="outline"
                                                                          onClick={() => document.getElementById("file-upload")?.click()}
                                                                      >
                                                                          Select File
                                                                      </Button>
                                                                      <input
                                                                          id="file-upload"
                                                                          type="file"
                                                                          accept="image/*,video/*"
                                                                          className="hidden"
                                                                          onChange={handleFileChange}
                                                                      />
                                                                     
                                                                  </div>
                                                              
                                                              <span className="text-sm text-muted-foreground"> Upload a high-quality  video that represents your course content or <span className="bg-emerald-700 px-1 rounded-sm text-white hover:cursor-pointer" onClick={() => setUseUrl(!useUrl)}> click here</span> to use a VIDEO URL</span>
                                                              </>
                                                              ) : (
                                                                  <div className="relative border rounded-lg overflow-hidden">
                                                                      {mediaPreview ? (
                                                                          <img
                                                                              src={mediaPreview || "/placeholder.svg"}
                                                                              alt="Preview"
                                                                              className="w-full h-64 object-cover"
                                                                          />
                                                                      ) : (
                                                                          <div className="w-full h-32 bg-muted flex items-center justify-center">
                                                                              <p className="text-muted-foreground">{mediaFile.name}</p>
                                                                          </div>
                                                                      )}
                                                                      <Button
                                                                          type="button"
                                                                          variant="destructive"
                                                                          size="icon"
                                                                          className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                                                          onClick={removeFile}
                                                                      >
                                                                          <X className="h-4 w-4" />
                                                                      </Button>
                                                                  </div>
                                                              )}
                                                              </>
                                                              )}
                                                              
                                                          </div>
                                                        <UploadingFormButton
                                                        loading={loading}   
                                                        loadingTitle={'Updating..'}
                                                        title={'Update Lesson'}
                                                        type={'submit'} 
                                                        uploading={uploading}
                                                        uploadingTitle={'uploading media...'}

                                                        />
              
                                                         
              
                                                      </form>
                                                  </Form>
                                              </CardContent>
                                          </Card>
                                      </div>
      
   
    
             
            </DialogContent>
          </Dialog>
        </div>
    )
}


"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, } from "@/components/ui/form";
import { Upload, X, Plus } from "lucide-react";
import TextInput, { TextAreaInput } from "../re_usable/FormInput";
import axios from 'axios';
import { toast } from "react-toastify"
import { MyLessonList } from "./MyLesson"
import { useAuth } from "@/context/authContext"
import UploadingFormButton from "./UploadingFormButton"



// Define Zod schema
const formSchema = z.object({
    title: z.string(),
    content: z.string(),
    videoUrl: z.string().optional(),
});

export default function LessonSection({ course }) {
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [mediaFile, setMediaFile] = useState(null)
    const [mediaPreview, setMediaPreview] = useState(null)
    const [isAddLessonDialogOpen, setIsAddLessonDialogOpen] = useState(false)
    const [newLesson, setNewLesson] = useState(course.lessons)
    const {user,loading:userLoading}=useAuth()
    const [useUrl,setUseUrl]=useState(false)


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            videoUrl: ""
        },
    });

    async function onSubmit(data) {
        let videoUrl = data.videoUrl;
        if (!mediaFile && !videoUrl) {
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

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/lesson/${course.id}`, data, {
                withCredentials: true,
            });
            //spread the existing lesson and merge it to the new one in an array
            setNewLesson([...newLesson, data]);


            setLoading(false);

            toast.success(res.data?.message);
            setIsAddLessonDialogOpen(false);




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

        // Create preview URL for image files
        if (file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setMediaPreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            // For non-image files, just show the file name
            setMediaPreview(null)
        }
    }
    function removeFile() {
        setMediaFile(null)
        setMediaPreview(null)
    }

    //lesson delete funtionality

    async function handleDeleteLesson(lessonId) {
        try {
            setDeleting(true);

            // Send DELETE request to backend
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/lesson/${lessonId}`, {
                withCredentials: true, // Ensure authentication
            });

            // Update lesson list in the frontend
            setNewLesson((prevLessons) => prevLessons.filter((lesson) => lesson.id !== lessonId));

            toast.success("Lesson deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete lesson. Please try again.");
        } finally {
            setDeleting(false);
        }
    }


    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Course Content</h2>
                <Dialog open={isAddLessonDialogOpen} onOpenChange={setIsAddLessonDialogOpen}>
                    {user.role==='instructor' && !userLoading && <DialogTrigger asChild>
                        <Button className={"bg-cyan-700 hover:bg-cyan-800 text-white"}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Lesson
                        </Button>
                    </DialogTrigger>}
                    <DialogContent className="sm:max-w-[550px] max-h-[100vh] overflow-y-scroll">
                        <DialogHeader>
                            <DialogTitle>Add New Lesson</DialogTitle>
                            <DialogDescription>Create a new lesson for this course.</DialogDescription>
                        </DialogHeader>
                        {/* lesson form here */}
                        <div className="container mx-auto max-w-3xl py-10">
                            <Card>

                                <CardContent>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            {/* Email Field */}

                                            <TextInput
                                                form={form}
                                                name="title"
                                                type="text"
                                                placeholder="Enter lesson title"
                                                label="Title" />

                                            <TextAreaInput
                                                form={form}
                                                name="content"
                                                placeholder="Describe what this lesson entails..."
                                                label="Content" />

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
                                            loadingTitle={"Creating Lesson..."}
                                            uploading={uploading}
                                            uploadingTitle={"Uploading Media..."}
                                            title={"Create Lesson"}
                                            type={'submit'}
                                            />

                                            
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </div>
                        {/* lesson form ends here */}
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>{newLesson?.length} Lesson(s)</CardTitle>

                    </div>
                </CardHeader>
                <CardContent>

                    <MyLessonList lessons={newLesson} onDeleteLesson={handleDeleteLesson} deleting={deleting} />
                </CardContent>
            </Card>
        </div>
    )
}
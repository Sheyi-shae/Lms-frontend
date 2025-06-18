"use client";
import { useState } from 'react'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, } from "@/components/ui/card"
import { Form, } from "@/components/ui/form";
import { Upload, X, Loader2 } from "lucide-react";
import TextInput, { TextAreaInput } from "../re_usable/FormInput";
import axios from 'axios';



// Define Zod schema
const formSchema = z.object({
    title: z.string(),
    content: z.string()
});



export function LessonForm({ id, onClose }) {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [mediaFile, setMediaFile] = useState(null)
    const [mediaPreview, setMediaPreview] = useState(null)
    const router = useRouter()

    // Initialize useForm with Zod resolver
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: ""
        },
    });

    async function onSubmit(data) {
        if (!mediaFile) {
            toast.error("Please upload a media file.");
            return;
        }

        try {
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

            setUploading(false);

            setLoading(true);
            const videoUrl = fileUpload.data.url;
            data = { ...data, videoUrl }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/lesson/${id}`, data, {
                withCredentials: true,
            });

            setLoading(false);

            toast.success(res.data?.message);

            onClose(false)


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

    return (
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
                                placeholder="Enter course title"
                                label="Title" />

                            <TextAreaInput
                                form={form}
                                name="content"
                                placeholder="Describe what this covers, who it's for, and what students will achieve..."
                                label="Content" />

                            {/* media for course */}
                            <div className="space-y-3">
                                <div className="text-sm font-medium">Course Media</div>

                                {!mediaFile ? (
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
                                <div className="text-sm text-muted-foreground">
                                    Upload a high-quality image or video that represents your course content.
                                </div>
                            </div>

                            <Button type='submit' disabled={loading || uploading}>
                                {uploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading media..
                                    </>
                                ) : loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                    </>
                                ) : (
                                    <>
                                        Add  lesson
                                    </>
                                )}
                            </Button>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

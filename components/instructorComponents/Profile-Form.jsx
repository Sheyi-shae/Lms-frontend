"use client"
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import axios from "axios";
import SubmitButton from "../re_usable/ReusableButtons";

import { Loader2, LoaderPinwheel, Upload, UploadCloudIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { dateConverter } from "@/lib/dateConverter";
import TextInput, { TextInputReadOnly } from "../re_usable/FormInput";
import UploadingFormButton from "./UploadingFormButton";

// Define the form schema with validation
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().optional(),
    avatar: z.string().optional(),
})


export default function ProfileForm({ user }) {
    const [isLoading, setIsLoading] = useState(false)
    const [avatarFile, setAvatarFile] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [uploading, setUploading] = useState(false)

    // Initialize the form with user data
    // Initialize useForm with Zod resolver
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || " seyi adeniyi",
            email: user?.email || "",
            phone: user?.phone || "",
          },
    });

    // Handle avatar file selection
    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setAvatarFile(file)

            // Create a preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle form submission
    async function onSubmit(data) {
        setIsLoading(true);
        let avatarUrl = user?.avatar;
    
        try {
            if (avatarFile) {
                setUploading(true);
    
                // Upload to Cloudinary
                const formData = new FormData();
                formData.append("file", avatarFile);
    
                const fileUpload = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
                    formData,
                    { withCredentials: true }
                );
                
                avatarUrl = fileUpload.data.url;
                setUploading(false);
            }
    
            data = { ...data, avatar: avatarUrl };
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user.id}`, data, {
                withCredentials: true,
            });
    
            setIsLoading(false);
            toast.success(res.data?.message);
        } catch (error) {
            setIsLoading(false);
            setUploading(false);
    
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
    }
    
    // Get initials for avatar fallback
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    return (
        <div className="grid gap-8 md:grid-cols-3">
            <Card className={`md:col-span-2 border-l-4  ${user.role==='student' ? 'border-l-emerald-600' :'border-l-cyan-600'} `}>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent>
                     <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={ user.avatar  || avatarPreview } alt={user.name} />
                                <AvatarFallback>{user?.name ? getInitials(user.name) : "??"}</AvatarFallback>

                            </Avatar>
                            <div className="flex flex-col items-center">
                                <label htmlFor="avatar-upload" className="cursor-pointer">
                                    <div className="flex items-center space-x-2 text-sm text-primary">
                                        <Upload className="h-4 w-4" />
                                        <span>Change avatar</span>
                                    </div>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                </label>
                                {avatarFile && <p className="text-xs text-muted-foreground mt-1">{avatarFile.name}</p>}
                            </div>
                        </div>
                        {/* form here */}
                        <div className="flex-1 space-y-4">

                         <TextInput
                                 form={form} 
                                 name="name" 
                                 type="text" 
                                 placeholder="Enter your name" 
                                 label="Full name"/>
                                 <TextInputReadOnly
                                 form={form} 
                                 name="email" 
                                 type="email" 
                                 
                                 label="Email"/>
                                 
                         <TextInput
                                 form={form} 
                                 name="phone" 
                                 type="number" 
                                 placeholder="Enter your number" 
                                 label="Phone Number"/>
                        </div>


                    </div>
                    

                    <div className="flex justify-end">
                       

                    <Button type='submit' className={user.role==='student' ?'bg-emerald-700' :'bg-cyan-700'} disabled={isLoading || uploading}>
      {uploading ? (
        <>
          <UploadCloudIcon className="mr-2 h-4 w-4 animate-spin" /> Uploading image..
        </>
      ) : isLoading ?(
        <>
        <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> saving changes..
        </>
      ) : (
        <>
        Save Changes
        </>
      )}
    </Button>
                    </div>
                   </form>
                       </Form>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium">Account Type</p>
                            <div className="flex items-center mt-1">
                                <Badge variant={user?.role === "student" ? "default" : "secondary"}>
                                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}

                                </Badge>
                                {user.isVerified && (
                                    <Badge variant="outline" className="ml-2">
                                        Verified
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <p className="text-sm font-medium">Member Since</p>
                            <p className="text-sm text-muted-foreground mt-1">{user?.createdAt && dateConverter(user.createdAt)}</p>
                        </div>

                        <Separator />

                        <div>
                            <p className="text-sm font-medium">Last Updated</p>
                            <p className="text-sm text-muted-foreground mt-1">{user?.updatedAt && dateConverter(user.updatedAt)}</p>
                        </div>

                        {user.role === "student" && user.courses.length > 0 && (
                            <>
                                <Separator />
                                <div>
                                    <p className="text-sm font-medium">Enrolled Courses</p>
                                    <p className="text-sm text-muted-foreground mt-1">{user?.courses.length} course(s)</p>
                                </div>
                            </>
                        )}

                        {user.role === "instructor" && user.teaching.length > 0 && (
                            <>
                                <Separator />
                                <div>
                                    <p className="text-sm font-medium">Courses Published</p>
                                    <p className="text-sm text-muted-foreground mt-1">{user.teaching.length} course(s)</p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full">
                            Change Password
                        </Button>

                        {!user.isVerified && (
                            <Button variant="outline" className="w-full">
                                Resend Verification Email
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


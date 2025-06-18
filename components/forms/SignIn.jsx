"use client";
import {useState} from 'react'
import {  toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  
} from "@/components/ui/form";

import TextInput from "../re_usable/FormInput";
import axios from 'axios';
import SubmitButton from '../re_usable/ReusableButtons';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';


// Define Zod schema
const formSchema = z.object({
  email: z.string(),
  password: z.string()
});



export function SignInForm() {
  const router =useRouter()
    const [loading, setLoading]=useState(false)
    const {checkAuthStatus,user,} = useAuth()
  // Initialize useForm with Zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "", 
      password: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-in`,
        data,
        { withCredentials: true }
      );
  
       await checkAuthStatus();
         toast.success(res.data?.message);
       
        if (!user?.isVerified) {
     
      router.push("/auth/verify-email");
    } else {
      router.push("/"); 
    }
      
      
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); 
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Email Field */}
        
        <TextInput
         form={form} 
         name="email" 
         type="email" 
         placeholder="Enter your email" 
         label="Email"/>

        <TextInput 
        form={form} 
        name="password" 
        type="password" 
        placeholder="Enter your password" 
        label="Password"/>

       
        <SubmitButton className='bg-emerald-700 text-white hover:bg-emerald-800'
         loading={loading} type="submit" initialText="Sign in" loadingText="Signing in..." />
      </form>
    </Form>
  );
}

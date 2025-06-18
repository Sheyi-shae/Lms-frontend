"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import TextInput from "../re_usable/FormInput";

import axios from "axios";
import SubmitButton from "../re_usable/ReusableButtons";

// Load Backend URL from .env
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Define Zod schema for validation
const formSchema = z
  .object({
    name: z.string().min(3, { message: "Full Name is required" }),
    email: z.string().email({ message: "Invalid Email address." }),
    password: z.string().min(6, { message: "Password is too weak" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function InstructorSignUpForm() {
  const [loading, setLoading] = useState(false);

  // Initialize useForm with Zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    const role = "instructor";
    data = { ...data, role };
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/sign-up`, data, {
        // withCredentials: true, 
      });

      setLoading(false); 
      
      toast.success(res.data?.message);
    
    } catch (error) {
       
      setLoading(false); 
      const errorMessage = error.response?.data?.message || 
                           "Something went wrong. Please try again.";
  
      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name Field */}
        <TextInput
          form={form}
          name="name"
          type="text"
          placeholder="Enter your full name"
          label="Full Name"
        />

        {/* Email Field */}
        <TextInput
          form={form}
          name="email"
          type="email"
          placeholder="Enter your email"
          label="Email"
        />

        {/* Password Field */}
        <TextInput
          form={form}
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
        />

        {/* Confirm Password Field */}
        <TextInput
          form={form}
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          label="Confirm Password"
        />

        {/* Submit Button */}
      <SubmitButton loading={loading} type="submit" initialText="Sign up" loadingText="Signing up..." />

      </form>
    </Form>
  );
}

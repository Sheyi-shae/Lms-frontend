"use client";
import React from 'react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {useState} from 'react'
import {  toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {Form} from "@/components/ui/form";
import { LoaderPinwheel } from "lucide-react";
import TextInput,{TextAreaInput} from "../re_usable/FormInput";
import axios from 'axios';
import SubmitButton from '../re_usable/ReusableButtons';


// Define Zod schema
const formSchema = z.object({
  name: z.string(),
  description: z.string()
});


export default function CategoryDialog({isModalOpen,setIsModalOpen,fetchCategories}) {
   const [loading, setLoading]=useState(false)
      
    // Initialize useForm with Zod resolver
    const form = useForm({
      
      resolver: zodResolver(formSchema),
      defaultValues: { 
        name: "",
        description: "",
      },
    });

    async function onSubmit(data) {
    
    try {
      

      setLoading(true);
      
      const res= await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`, data, {
        withCredentials: true, 
      });

     
      
      toast.success(res.data?.message);
      
      fetchCategories();
      form.reset();
      setIsModalOpen(false);
      
    
    } catch (error) {
        
      const errorMessage = error.response?.data?.message || 
                           "Something went wrong. Please try again.";
  
      toast.error(errorMessage);
    }
  finally{
    setLoading(false);
    }
}
  return (
    <div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="w-full  md:max-w-3xl p-0 overflow-hidden">
              <DialogTitle className="sr-only">
      Add new category
    </DialogTitle>
    
               <div className='py-6 px-3'>
                <Card className={'border-l-4 border-l-cyan-700'}>
                        <CardHeader>
                          <CardTitle className="text-2xl">Create New Category</CardTitle>
                          <CardDescription>
                            Fill in the details below to create new category
                          </CardDescription>
                          
                        </CardHeader>
                        <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Email Field */}
                        
                        <TextInput
                         form={form} 
                         name="name" 
                         type="text" 
                         placeholder="Enter category name" 
                         label="Name"/>
                
                        <TextAreaInput 
                        form={form} 
                        name="description"  
                        placeholder="Describe the category" 
                        label="Description"/>
                
                              <Button className={'bg-cyan-700'} type='submit' disabled={loading }>
                      { loading ?(
                        <>
                        <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> Creating new category..
                        </>
                      ) : (
                        <>
                        Create Category
                        </>
                      )}
                    </Button>
                
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

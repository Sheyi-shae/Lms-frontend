"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function TextInput({form,name,label,type,placeholder}) {

  return (
    
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input type={type} placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       
      
  );
}

export  function TextInputReadOnly({form,name,label,type,placeholder}) {

  return (
    
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input  className={'bg-slate-200 text-black focus:ring-0'} type={type} placeholder={placeholder} readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       
      
  );
}


export  function TextAreaInput({form,name,label,type,placeholder}) {

  return(

    //"Describe what your course covers, who it's for, and what students will achieve..."
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={placeholder}
                        className="min-h-32 resize-y"
                        {...field}
                      />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />
  )}



  // select field
  export function SelectForm({ form, name, label, type, placeholder, options = [] }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full h-12 text-base"> 
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="w-full max-h-64 overflow-y-auto text-base">
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.id} className="text-base py-3">
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

  
 

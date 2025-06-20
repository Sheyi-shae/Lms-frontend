"use client"
import CategoryList from '@/components/instructorComponents/CategoryList'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import CategoryDialog from '@/components/instructorComponents/CategoryDialog'
import axios from 'axios'

export default function page() {
    const [isModalOpen, setIsModalOpen] = useState(false) 
    
const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

 
 const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`, {
        withCredentials: true,
      })
      
      setCategories(response.data.data)
    } catch (error) {
      //console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }
   //fetch categories from the server
  useEffect(() => {
    fetchCategories()
  }, [])

    
  return (
    
       
            <div className="container py-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground">Explore our popular categories</p>
                  </div>
                  
                    <Button onClick={()=>setIsModalOpen(!isModalOpen)} className=" bg-cyan-700 w-full md:w-auto">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  
                </div>
        
                
              </div>
              <div className='pt-3'><CategoryList categories={categories} /></div>

              <CategoryDialog fetchCategories={fetchCategories} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>

              
            </div>
        
        
     
  )
}

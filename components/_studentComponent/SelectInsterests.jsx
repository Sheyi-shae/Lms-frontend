"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { set } from "react-hook-form"
import { toast } from "react-toastify"



export default function SelectInterests({isOpen, setIsOpen}) {
  const [selectedCategories, setSelectedCategories] = useState([])
  //loading categories
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  
  const [savedCategories, setSavedCategories] = useState([])

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.some((cat) => cat.id === category.id)

      if (isSelected) {
        // Remove category if already selected
        return prev.filter((cat) => cat.id !== category.id)
      } else {
        // Add category if under limit
        if (prev.length < 5) {
          return [...prev, category]
        }
        return prev
      }
    })
  }
  //fetch all categories from the backend
  const fetchCategories = async () => {
    setLoadingCategories(true)
    setCategories([])
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`, {
        withCredentials: true,
        })
        setCategories(res.data.data)
    } catch (error) {
     
    }finally {
      setLoadingCategories(false)
    }
  }

  //save selected categories to the backend
  const handleSave = async() => {
    setLoading(true)
    setSavedCategories(selectedCategories)
     const selectedIds = selectedCategories.map((cat) => cat.id) 
    
  try {
    await axios.put(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/interests`, 
         { interests: selectedIds }, {withCredentials:true})
         
         toast.success("Your interests have been saved successfully!")
    
    setIsOpen(false)
   
  } catch (err) {
    //console.error("Error saving interests:", err)
    toast.error(err?.response?.data?.message || "Failed to save interests. Please try again.")
  }finally {
    setLoading(false)
  }
}

 

  const handleCancel = () => {
    setSelectedCategories(savedCategories)
    setIsOpen(false)
  }

  const isSelected = (categoryId) => {
    return selectedCategories.some((cat) => cat.id === categoryId)
  }

  const canSelectMore = selectedCategories.length < 5

  useEffect(() => {
    fetchCategories()
    }, [])

  return (
    <div className="p-8 space-y-6">
      

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Your Interests</DialogTitle>
            <DialogDescription>
              Choose up to 5 categories that interest you. You have selected {selectedCategories.length}/5 categories.
            </DialogDescription>
          </DialogHeader>

          {loadingCategories ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-primary"></div>
            </div>
          ): (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {categories.map((category) => {
                const selected = isSelected(category.id)
               
                const disabled = !selected && !canSelectMore

                return (
                  <div
                    key={category.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                      selected
                        ? "bg-primary/5 border-primary"
                        : disabled
                          ? "bg-muted/50 border-muted"
                          : "hover:bg-muted/50"
                    }`}
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selected}
                      disabled={disabled}
                      onCheckedChange={() => handleCategoryToggle({ id: category.id, name: category.name })}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-1">
                      <label
                        htmlFor={`category-${category.id}`}
                        className={`text-sm font-medium cursor-pointer ${disabled ? "text-muted-foreground" : ""}`}
                      >
                        {category.name}
                      </label>
                      <p className={`text-xs ${disabled ? "text-muted-foreground" : "text-muted-foreground"}`}>
                        {category.description}
                      </p>
                    </div>
                    
                  </div>
                )
              })}
            </div>
          </ScrollArea>)}

          {selectedCategories.length === 5 && (
            <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded-md">
              Maximum of 5 categories selected. Unselect a category to choose a different one.
            </div>
          )}

          <DialogFooter className="flex justify-between items-center ">
            <div className="text-sm text-muted-foreground">{selectedCategories.length}/5 categories selected</div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={selectedCategories.length === 0 || loading} className="min-w-[100px]">
                {loading ? "Saving..." : "Save Interests"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

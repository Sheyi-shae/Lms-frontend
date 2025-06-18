"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"




export default function CategoryList({ categories, showSearch = true }) {


  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-7 -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          )}
        </div>
      )}

      {filteredCategories.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
           

            return (
              <Card key={category.id} className="transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-md ${category.color}`}>
                     
                    </div>
                    <Badge variant="outline">{category.courses.length} courses</Badge>
                  </div>
                  <CardTitle className="mt-4">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                
                <CardFooter>
                  <Link href={'#'} className="text-sm font-medium hover:underline">
                    View courses →
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      
    </div>
  )
}

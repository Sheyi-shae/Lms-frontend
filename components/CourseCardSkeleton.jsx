import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function StudentCourseCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {/* Image skeleton */}
      <div className="aspect-video w-full bg-muted animate-pulse" />

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          {/* Badge skeleton */}
          <div className="h-5 w-24 bg-muted rounded-full animate-pulse" />
          {/* Rating skeleton */}
          <div className="flex items-center">
            <div className="h-4 w-4 bg-muted rounded-full mr-1 animate-pulse" />
            <div className="h-4 w-8 bg-muted rounded-full animate-pulse" />
          </div>
        </div>

        {/* Title skeleton */}
        <div className="h-7 w-full bg-muted rounded-md mt-2 animate-pulse" />

        {/* Instructor skeleton */}
        <div className="h-4 w-32 bg-muted rounded-full mt-2 animate-pulse" />
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        {/* Description skeleton - multiple lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded-full animate-pulse" />
          <div className="h-4 w-full bg-muted rounded-full animate-pulse" />
          <div className="h-4 w-2/3 bg-muted rounded-full animate-pulse" />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        {/* Students count skeleton */}
        <div className="flex items-center">
          <div className="h-4 w-4 bg-muted rounded-full mr-1 animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded-full animate-pulse" />
        </div>

        {/* Button skeleton */}
        <div className="h-9 w-28 bg-muted rounded-md animate-pulse" />
      </CardFooter>
    </Card>
  )
}

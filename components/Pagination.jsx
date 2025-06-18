import Link from "next/link"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"



export function Pagination({ totalPages, currentPage, baseUrl }) {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) {
    return null
  }

  // Function to generate page links with proper ellipsis
  const generatePageLinks = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range of pages to show around current page
    const rangeStart = Math.max(2, currentPage - 1)
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis if needed before range
    if (rangeStart > 2) {
      pages.push("ellipsis-start")
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Add ellipsis if needed after range
    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis-end")
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageLinks = generatePageLinks()

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {/* Previous page button */}
      <Link
        href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "gap-1 pl-2.5",
          currentPage <= 1 && "pointer-events-none opacity-50",
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Link>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pageLinks.map((page, i) => {
          // Handle ellipsis
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return <MoreHorizontal key={page} className="h-4 w-4 text-muted-foreground" />
          }

          // Handle numbered pages
          return (
            <Link
              key={i}
              href={`${baseUrl}?page=${page}`}
              className={cn(buttonVariants({ variant: page === currentPage ? "default" : "outline" }), "h-9 w-9 p-0")}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Next page button */}
      <Link
        href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : "#"}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "gap-1 pr-2.5",
          currentPage >= totalPages && "pointer-events-none opacity-50",
        )}
        aria-label="Next page"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

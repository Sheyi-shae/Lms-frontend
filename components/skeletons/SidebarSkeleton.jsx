import { Skeleton } from "@/components/ui/skeleton"



export function SidebarSkeleton(isOpen) {
  return (
    <nav className="flex-1 overflow-y-auto p-4">
      <ul className="space-y-2">
        {/* Main menu items - 5 items */}
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <div className="flex items-center rounded-lg p-2">
              <Skeleton className="h-5 w-5 rounded-md" />
              {isOpen && <Skeleton className="ml-3 h-4 w-24" />}
            </div>
          </li>
        ))}

        {/* Settings item with submenu */}
        <li>
          <div className="flex items-center justify-between rounded-lg p-2">
            <div className="flex items-center">
              <Skeleton className="h-5 w-5 rounded-md" />
              {isOpen && <Skeleton className="ml-3 h-4 w-32" />}
            </div>
            {isOpen && <Skeleton className="h-4 w-4 rounded-full" />}
          </div>

          {/* Submenu items - only shown when expanded */}
          {isOpen && (
            <ul className="mt-2 space-y-1 pl-11">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index}>
                  <Skeleton className="h-4 w-28 rounded-lg p-2" />
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      {/* Extra Section */}
      {isOpen && (
        <div className="mt-6 pt-6">
          <Skeleton className="mb-3 h-3 w-16 px-2" />
          <ul className="mt-3 space-y-2">
            <li>
              <div className="flex items-center rounded-lg p-2">
                <Skeleton className="ml-3 h-4 w-24" />
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

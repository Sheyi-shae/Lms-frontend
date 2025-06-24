"use client"

import { useState } from "react"
import {
  BarChart3,
  BookDashed,
  ChevronDown,

  FolderArchiveIcon,

  Home,

  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Search,
  Settings,
  Settings2,

  Users,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { logout } from "@/apiRequest/logout"

const InstructorSidebar = ({ isMobileOpen, toggleMobileSidebar, user, loading }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState({
    courses: true,
    catalouge: true,
    settings: true,
  })

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }))
  }

  const pathName = usePathname()
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && <div className="fixed inset-0 text-sm z-20 bg-black/50 md:hidden" onClick={toggleMobileSidebar} />}


      <aside
        className={`fixed inset-y-0 left-0  text-sm z-40 flex h-screen flex-shrink-0 flex-col border-r bg-background/80 backdrop-blur-md  border-border/40 transition-all duration-300 md:sticky md:top-0 md:z-30
                   ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                   ${isOpen ? "w-64" : "w-20"}`}
      >

        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href={'/'}><div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600">
              <span className="text-lg font-bold text-white">L</span>
            </div>
            {isOpen && <span className="ml-2 text-lg font-semibold">Lucis</span>}
          </div></Link>
          <button className="hidden rounded-lg p-1 hover:bg-gray-100 md:block" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-1 hover:bg-gray-100 md:hidden" onClick={toggleMobileSidebar}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        {isOpen && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Sidebar Navigation - with overflow scroll */}
        {user ? (
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {/* Dashboard */}
              <li>
                <Link onClick={toggleMobileSidebar} href="/instructor" className={"flex items-center rounded-lg p-2  hover:text-gray-50 hover:bg-cyan-900" + (pathName === '/instructor' ? ' bg-cyan-700 text-white' : '')}>
                  <Home className="h-5 w-5 text-gray-300" />
                  {isOpen && <span className="ml-3">Dashboard</span>}
                </Link>
              </li>

              {/* Lesson - Collapsible */}
              <li>
                <button
                  onClick={() => toggleMenu("catalouge")}
                  className={"flex w-full items-center justify-between rounded-lg p-2 hover:text-gray-50 hover:bg-cyan-900" + (pathName.startsWith('instructor/catalouge') ? ' bg-cyan-700 text-white' : '')}
                >
                  <div className="flex items-center">
                    <FolderArchiveIcon className="h-5 w-5 text-gray-500" />
                    {isOpen && <span className="ml-3">Catalouge </span>}
                  </div>
                  {isOpen && (
                    <ChevronDown className={`h-4 w-4 transition-transform  ${expandedMenus.catalouge ? "rotate-180 " : ""}`} />
                  )}
                </button>

                {isOpen && expandedMenus.catalouge && (
                  <ul className="mt-2 space-y-1 pl-11">

                    <li>
                      <Link href="/instructor/catalogue/categories" onClick={toggleMobileSidebar} className={"block rounded-lg p-2 hover:text-gray-50 hover:bg-cyan-900" + (pathName === '/instructor/catalogue/categories' ? ' bg-cyan-600 text-white' : '')}>
                       Categories
                      </Link>
                    </li>
                    <li>
                      <Link href="#" onClick={toggleMobileSidebar} className={"block rounded-lg p-2 hover:text-gray-50 hover:bg-cyan-900" + (pathName === '/instructor/catalogue/lessons' ? ' bg-cyan-600 text-white' : '')}>
                       All Lessons
                      </Link>
                    </li>

                  </ul>
                )}
              </li>

              {/* courses - Collapsible */}
              <li>
                <button
                  onClick={() => toggleMenu("courses")}
                  className={"flex w-full items-center justify-between rounded-lg p-2  hover:text-gray-50 hover:bg-cyan-900" + (pathName.startsWith('/instructor/courses') ? ' bg-cyan-700 text-white' : '')}
                >
                  <div className="flex items-center">
                    <LayoutDashboard className="h-5 w-5 text-gray-300" />
                    {isOpen && <span className="ml-3">Courses </span>}
                  </div>
                  {isOpen && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedMenus.courses ? "rotate-180" : ""}`} />
                  )}
                </button>

                {isOpen && expandedMenus.courses && (
                  <ul className="mt-2 space-y-1 pl-11">
                    <li>
                      <Link onClick={toggleMobileSidebar} href="/instructor/courses/my_courses" className={"block rounded-lg p-2  hover:text-gray-50 hover:bg-cyan-900" + (pathName ==='/instructor/courses/my_courses' ? ' bg-cyan-600 text-white' : '')}>
                        My Courses
                      </Link>
                    </li>
                    <li>
                      <Link onClick={toggleMobileSidebar} href="/instructor/courses/create" className={"block rounded-lg p-2  hover:text-gray-50 hover:bg-cyan-900" + (pathName === '/instructor/courses/create' ? ' bg-cyan-600 text-white' : '')}>
                        Create Course
                      </Link>
                    </li>
                    <li>
                      <Link onClick={toggleMobileSidebar} href="/instructor/course_performance" className={"block rounded-lg p-2  hover:text-gray-50 hover:bg-cyan-900" + (pathName === '/instructor/course_performance' ? ' bg-cyan-600 text-white' : '')}>
                        Student Performance
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              

              {/* settings - Collapsible */}
              <li>
                <button
                  onClick={() => toggleMenu("settings")}
                  className={"flex w-full items-center justify-between rounded-lg p-2 hover:text-gray-50 hover:bg-cyan-900" + (pathName.startsWith('instructor/profile') ? ' bg-cyan-700 text-white' : '')}
                >
                  <div className="flex items-center">
                    <Settings2 className="h-5 w-5 text-gray-500" />
                    {isOpen && <span className="ml-3">Profile & Settings</span>}
                  </div>
                  {isOpen && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedMenus.settings ? "rotate-180" : ""}`} />
                  )}
                </button>

                {isOpen && expandedMenus.settings && (
                  <ul className="mt-2 space-y-1 pl-11">
                    <li>
                      <Link onClick={toggleMobileSidebar} href="/instructor/profile" className={"block rounded-lg p-2 hover:text-gray-50 hover:bg-cyan-900" + (pathName === 'instructor/profile' ? ' bg-cyan-600 text-white' : '')}>
                        profile
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className={"block rounded-lg p-2 text-gray-900 hover:bg-gray-100" + (pathName === 'instructor/settings/change_password' ? ' bg-black text-white' : '')}>
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className={"block rounded-lg p-2 text-gray-900 hover:bg-gray-100" + (pathName === 'instructor/settings/account_settings' ? ' bg-black text-white' : '')}>
                        Account Settings
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Other Menu Items */}

            </ul>

            {/* Extra Section */}
            {isOpen && (
              <>
                <div className="mt-6 pt-6">
                  <h3 className="px-2 text-xs font-semibold uppercase text-gray-500">Extra</h3>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <a href="/help" className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
                        <span className="ml-3">Help Center</span>
                      </a>
                    </li>


                  </ul>
                </div>
              </>
            )}
          </nav>
        ) : (
          <>

          </>
        )}
      </aside>
    </>
  )
}

export default InstructorSidebar


import { useContext } from 'react'
import SidebarContext from 'context/SidebarContext'
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
} from 'icons'

import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { X } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/router'


function Header() {
  // TODO 此处需要依据后端拿到的数据去更新用户的头像
  const { theme, setTheme } = useTheme()
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useContext(SidebarContext)
  const router = useRouter()


  return (
    <header className="py-4 z-50 g-white shadow-bottom dark:bg-gray-800 border-b dark:border-slate-500">
      <div className="container flex items-center justify-between h-full px-4 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        {!isSidebarOpen && <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu">
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        }
        {
          isSidebarOpen && <X onClick={closeSidebar} className='bg-white dark:bg-gray-800 lg:hidden' />
        }
        <ul className="flex flex-1 justify-end items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <Button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={() => {
                if (theme == "dark") {
                  setTheme("light")
                } else {
                  setTheme("dark")
                }
              }}
              aria-label="Toggle color mode"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </Button>
          </li>
          {/* <!-- Notifications menu --> */}
          {/* <!-- Profile menu --> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='hover:cursor-pointer'>
                <AvatarImage src="https://go.dev/images/gophers/pilot-bust.svg" />
                <AvatarFallback>Me</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={
                () => {
                  signOut()
                }
              }>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ul>
      </div>
    </header>
  )
}

export default Header

'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LoginModal } from "./login-modal"
import { RegisterModal } from "./register-modal"
import { ChevronDown, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function NavBar() {
  const router = useRouter()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const data = localStorage.getItem("userData")
    if (data) {
      setUserData(JSON.parse(data))
    }
  }, [])

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            MyPcPlanner
          </Link>
          <div className="hidden space-x-6 md:flex">
            {/* <Link href="/pc" className="text-sm font-medium">
              PC
            </Link>
            <Link href="/components" className="text-sm font-medium">
              Components
            </Link>
            <Link href="/forum" className="text-sm font-medium">
              Forum
            </Link> */}
          </div>
        </div>
        {userData ? (
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt={userData.username} />
              <AvatarFallback>{userData.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="p-0 font-normal">
                  Hi, {userData.username} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => (localStorage.removeItem("userData"), router.push("/"))}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setShowLogin(true)}>
              Login
            </Button>
            <Button onClick={() => setShowRegister(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} openRegister={() => setShowRegister(true)} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} openLogin={() => setShowLogin(true)} />
    </nav>
  )
}


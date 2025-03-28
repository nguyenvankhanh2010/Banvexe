"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Globe, Menu, Phone, X, User, CreditCard, History, MapPin, Lock, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "TRANG CHỦ", href: "/" },
  { name: "LỊCH TRÌNH", href: "/lich-trinh" },
  { name: "TRA CỨU VÉ", href: "/tra-cuu-ve" },
  { name: "TIN TỨC", href: "/tin-tuc" },
  { name: "HÓA ĐƠN", href: "/hoa-don" },
  { name: "LIÊN HỆ", href: "/lien-he" },
  { name: "VỀ CHÚNG TÔI", href: "/ve-chung-toi" },
  { name: "HƯỚNG DẪN ĐẶT VÉ", href: "/huong-dan-dat-ve" },
]

const userMenuItems = [
  { name: "FUTAPay", href: "/tai-khoan/futa-pay", icon: CreditCard, color: "bg-green-600" },
  { name: "Thông tin tài khoản", href: "/tai-khoan/thong-tin-chung", icon: User, color: "bg-yellow-500" },
  { name: "Lịch sử mua vé", href: "/tai-khoan/lich-su-mua-ve", icon: History, color: "bg-blue-400" },
  { name: "Địa chỉ của bạn", href: "/tai-khoan/dia-chi", icon: MapPin, color: "bg-pink-500" },
  { name: "Đặt lại mật khẩu", href: "/tai-khoan/dat-lai-mat-khau", icon: Lock, color: "bg-orange-500" },
  { name: "Đăng xuất", href: "/dang-xuat", icon: LogOut, color: "bg-red-500" },
]

export function Header() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("TRANG CHỦ")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("Người dùng")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Check if user is logged in and get user name
  useEffect(() => {
    // Check for token and user name in localStorage
    const token = localStorage.getItem("userToken")
    const storedName = localStorage.getItem("userName")
    
    setIsLoggedIn(!!token)
    if (storedName) {
      setUserName(storedName)
    }
  }, [pathname]) // Re-check when pathname changes to update after login/logout

  // Set active tab based on current path
  useEffect(() => {
    const currentTab = navigation.find((item) => pathname === item.href)
    if (currentTab) {
      setActiveTab(currentTab.name)
    }
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-gradient-to-r from-futa-orange to-orange-500">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo - always centered */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Mở menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                <div className="bg-futa-orange p-4 flex justify-between items-center">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative h-10 w-32">
                      <Image
                        src="/placeholder.svg?height=40&width=128"
                        alt="FUTA Bus Lines"
                        width={128}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col p-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="py-3 text-lg font-medium border-b border-gray-200"
                      onClick={() => {
                        setActiveTab(item.name)
                        setIsMenuOpen(false)
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {isLoggedIn && (
                    <Link
                      href="/dang-xuat"
                      className="py-3 text-lg font-medium border-b border-gray-200 text-left text-red-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ĐĂNG XUẤT
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 text-white">
              <Globe className="h-5 w-5" />
              <span className="hidden md:inline">VI</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Phone className="h-5 w-5" />
              <span className="hidden md:inline">Tải ứng dụng</span>
            </div>
          </div>

          {/* Center logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="sr-only">FUTA Bus Lines</span>
            </Link>
          </div>

          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-2" ref={dropdownRef}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span>{userName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-0">
                    {userMenuItems.map((item) => (
                      <DropdownMenuItem key={item.name} asChild className="p-0">
                        <Link href={item.href} className="w-full flex items-center px-2 py-2.5">
                          <div className={`${item.color} rounded-full p-2 mr-3`}>
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/dang-nhap">
                <Button variant="ghost" className="text-white">
                  <span className="hidden sm:inline">Đăng nhập/</span>Đăng ký
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <nav className="bg-futa-orange border-t border-white/20 hidden md:block">
        <div className="container overflow-x-auto">
          <ul className="flex justify-center whitespace-nowrap">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-block px-4 py-3 text-sm font-medium text-white hover:bg-white/10",
                    activeTab === item.name && "border-b-2 border-white",
                  )}
                  onClick={() => setActiveTab(item.name)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

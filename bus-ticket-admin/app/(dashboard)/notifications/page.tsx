"use client"

import { useState } from "react"
import { Search, Filter, Bell, CheckCircle, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  content: string
  time: string
  type: "booking" | "payment" | "system" | "support"
  read: boolean
}

const mockNotifications: Notification[] = Array.from({ length: 20 }).map((_, i) => {
  const types = ["booking", "payment", "system", "support"] as const
  const type = types[i % 4]

  let title = ""
  let content = ""

  switch (type) {
    case "booking":
      title = "Đặt vé mới"
      content = `Khách hàng Nguyễn Văn ${String.fromCharCode(65 + i)} đã đặt vé #BT${20000 + i}`
      break
    case "payment":
      title = "Thanh toán thành công"
      content = `Vé #BT${20000 + i} đã được thanh toán thành công`
      break
    case "system":
      title = "Cập nhật hệ thống"
      content = "Hệ thống sẽ bảo trì vào ngày 30/04/2025 từ 23:00 - 01:00"
      break
    case "support":
      title = "Yêu cầu hỗ trợ mới"
      content = `Khách hàng Trần Thị ${String.fromCharCode(65 + i)} cần hỗ trợ về vé #BT${20000 + i}`
      break
  }

  return {
    id: `NOTIF${10000 + i}`,
    title,
    content,
    time: `${i % 24}:${(i * 3) % 60} ${20 + (i % 10)}/04/2025`,
    type,
    read: i > 5,
  }
})

const typeMap = {
  booking: { label: "Đặt vé", variant: "default" },
  payment: { label: "Thanh toán", variant: "success" },
  system: { label: "Hệ thống", variant: "destructive" },
  support: { label: "Hỗ trợ", variant: "warning" },
}

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  const filteredNotifications = mockNotifications.filter((notification) => {
    // Search filter
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Type filter
    if (typeFilter !== "all" && notification.type !== typeFilter) {
      return false
    }

    // Unread only filter
    if (showUnreadOnly && notification.read) {
      return false
    }

    // Time filter
    if (timeFilter !== "all") {
      // This is a simplified example. In a real app, you would use proper date comparison
      if (timeFilter === "today" && !notification.time.includes("30/04")) {
        return false
      } else if (timeFilter === "week" && Number.parseInt(notification.time.split("/")[0]) < 25) {
        return false
      }
    }

    return true
  })

  const handleMarkAsRead = () => {
    if (selectedNotifications.length === 0) return

    toast({
      title: "Đánh dấu đã đọc",
      description: `${selectedNotifications.length} thông báo đã được đánh dấu là đã đọc.`,
    })

    setSelectedNotifications([])
  }

  const handleDelete = () => {
    if (selectedNotifications.length === 0) return

    toast({
      title: "Xóa thông báo",
      description: `${selectedNotifications.length} thông báo đã được xóa.`,
    })

    setSelectedNotifications([])
  }

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    } else {
      setSelectedNotifications([])
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((nId) => nId !== id))
    } else {
      setSelectedNotifications([...selectedNotifications, id])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Thông báo</h1>
        <p className="text-muted-foreground">Xem và quản lý các thông báo hệ thống</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm thông báo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[300px]"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Loại thông báo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="booking">Đặt vé</SelectItem>
                    <SelectItem value="payment">Thanh toán</SelectItem>
                    <SelectItem value="system">Hệ thống</SelectItem>
                    <SelectItem value="support">Hỗ trợ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="today">Hôm nay</SelectItem>
                    <SelectItem value="week">7 ngày qua</SelectItem>
                    <SelectItem value="month">Tháng này</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="unread-only"
                checked={showUnreadOnly}
                onCheckedChange={(checked) => setShowUnreadOnly(!!checked)}
              />
              <Label htmlFor="unread-only">Chỉ hiển thị chưa đọc</Label>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAsRead}
                disabled={selectedNotifications.length === 0}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Đánh dấu đã đọc
              </Button>
              <Button variant="outline" size="sm" onClick={handleDelete} disabled={selectedNotifications.length === 0}>
                <Trash className="mr-2 h-4 w-4" />
                Xóa
              </Button>
            </div>
          </div>

          <div className="mt-4 rounded-md border">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={
                    selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                />
                <Label htmlFor="select-all">Chọn tất cả</Label>
              </div>
              <p className="text-sm text-muted-foreground">{filteredNotifications.length} thông báo</p>
            </div>

            <div className="divide-y">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn("flex items-start gap-4 p-4 hover:bg-muted/50", !notification.read && "bg-muted/20")}
                  >
                    <Checkbox
                      checked={selectedNotifications.includes(notification.id)}
                      onCheckedChange={() => toggleSelect(notification.id)}
                      className="mt-1"
                    />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{notification.title}</h3>
                          <Badge
                            variant={
                              typeMap[notification.type].variant as
                                | "default"
                                | "secondary"
                                | "destructive"
                                | "outline"
                                | "success"
                                | "warning"
                            }
                          >
                            {typeMap[notification.type].label}
                          </Badge>
                          {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                        </div>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-32 items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <Bell className="h-8 w-8 text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">Không có thông báo nào</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

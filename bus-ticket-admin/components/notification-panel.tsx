"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  content: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Yêu cầu hủy vé mới",
    content: "Khách hàng Nguyễn Văn A đã yêu cầu hủy vé #BT12345",
    time: "5 phút trước",
    read: false,
  },
  {
    id: "2",
    title: "Đặt vé thành công",
    content: "Vé #BT12346 đã được đặt thành công",
    time: "30 phút trước",
    read: false,
  },
  {
    id: "3",
    title: "Yêu cầu hỗ trợ",
    content: "Khách hàng Trần Thị B cần hỗ trợ về vé #BT12347",
    time: "1 giờ trước",
    read: true,
  },
  {
    id: "4",
    title: "Thanh toán thành công",
    content: "Vé #BT12348 đã được thanh toán thành công",
    time: "3 giờ trước",
    read: true,
  },
  {
    id: "5",
    title: "Khuyến mãi mới",
    content: "Khuyến mãi 'Hè vui vẻ' đã được tạo",
    time: "1 ngày trước",
    read: true,
  },
]

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [timeFilter, setTimeFilter] = useState("all")

  const filteredNotifications = mockNotifications.filter((notification) => {
    if (showUnreadOnly && notification.read) {
      return false
    }
    return true
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 md:items-center md:justify-center"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md overflow-auto bg-background p-4 shadow-lg md:h-auto md:max-h-[80vh] md:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-semibold">Thông báo</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Đóng</span>
          </Button>
        </div>

        <div className="my-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="unread-only"
              checked={showUnreadOnly}
              onCheckedChange={(checked) => setShowUnreadOnly(!!checked)}
            />
            <Label htmlFor="unread-only">Chỉ hiển thị chưa đọc</Label>
          </div>

          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Lọc theo thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="week">7 ngày qua</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50",
                  !notification.read && "border-l-4 border-l-primary",
                )}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{notification.content}</p>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-muted-foreground">Không có thông báo nào</p>
          )}
        </div>
      </div>
    </div>
  )
}

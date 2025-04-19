"use client"

import { useState } from "react"
import { Edit, Eye, Plus, Search, Trash } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { NotificationForm } from "@/components/notifications/notification-form"
import { NotificationDetails } from "@/components/notifications/notification-details"

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [targetFilter, setTargetFilter] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)

  // Sample data - in a real app, this would come from an API
  const notifications = [
    {
      id: 1,
      title: "Cập nhật lịch trình",
      content:
        "Các chuyến xe đi Hải Phòng sẽ thay đổi lịch trình từ ngày 20/04/2023 do đường đang được sửa chữa. Vui lòng thông báo cho khách hàng.",
      target: "staff",
      createdAt: "2023-04-19T10:30:00",
    },
    {
      id: 2,
      title: "Khuyến mãi mới",
      content:
        "Giảm 10% cho tất cả các chuyến xe vào cuối tuần từ ngày 22/04 đến 30/04/2023. Áp dụng cho tất cả các tuyến.",
      target: "customer",
      createdAt: "2023-04-18T14:15:00",
    },
    {
      id: 3,
      title: "Bảo trì hệ thống",
      content:
        "Hệ thống sẽ được bảo trì từ 00:00 đến 02:00 ngày 21/04/2023. Trong thời gian này, hệ thống đặt vé sẽ tạm ngưng hoạt động.",
      target: "all",
      createdAt: "2023-04-17T09:45:00",
    },
    {
      id: 4,
      title: "Thông báo nghỉ lễ",
      content:
        "Thông báo lịch nghỉ lễ 30/4 và 1/5. Văn phòng sẽ đóng cửa từ ngày 29/4 đến hết ngày 1/5. Các chuyến xe vẫn hoạt động bình thường.",
      target: "staff",
      createdAt: "2023-04-15T11:20:00",
    },
    {
      id: 5,
      title: "Cập nhật giá vé",
      content:
        "Thông báo cập nhật giá vé cho các tuyến đường từ Hà Nội đi các tỉnh phía Bắc. Giá vé sẽ tăng 5% từ ngày 01/05/2023.",
      target: "customer",
      createdAt: "2023-04-14T16:30:00",
    },
  ]

  const handleView = (notification: any) => {
    setSelectedNotification(notification)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (notification: any) => {
    setSelectedNotification(notification)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (notificationId: number) => {
    // In a real app, this would call an API to delete the notification
    console.log(`Deleting notification ${notificationId}`)
    // Then refresh the data
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTarget = !targetFilter || notification.target === targetFilter

    return matchesSearch && matchesTarget
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "HH:mm - dd/MM/yyyy", { locale: vi })
  }

  const getTargetLabel = (target: string) => {
    switch (target) {
      case "staff":
        return "Nhân viên"
      case "customer":
        return "Khách hàng"
      case "all":
        return "Tất cả"
      default:
        return target
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý thông báo</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tạo thông báo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Tạo thông báo mới</DialogTitle>
              <DialogDescription>Tạo thông báo mới để gửi đến nhân viên hoặc khách hàng</DialogDescription>
            </DialogHeader>
            <NotificationForm onSubmit={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="search">Tìm kiếm</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Tiêu đề, nội dung..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Đối tượng nhận</Label>
              <Select value={targetFilter} onValueChange={setTargetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_targets">Tất cả</SelectItem>
                  <SelectItem value="staff">Nhân viên</SelectItem>
                  <SelectItem value="customer">Khách hàng</SelectItem>
                  <SelectItem value="all">Tất cả đối tượng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Nội dung rút gọn</TableHead>
                <TableHead>Đối tượng nhận</TableHead>
                <TableHead>Thời gian tạo</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">{notification.title}</TableCell>
                  <TableCell>
                    {notification.content.length > 50
                      ? `${notification.content.substring(0, 50)}...`
                      : notification.content}
                  </TableCell>
                  <TableCell>{getTargetLabel(notification.target)}</TableCell>
                  <TableCell>{formatDate(notification.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleView(notification)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Xem</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit(notification)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Sửa</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(notification.id)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết thông báo</DialogTitle>
          </DialogHeader>
          {selectedNotification && <NotificationDetails notification={selectedNotification} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông báo</DialogTitle>
            <DialogDescription>Cập nhật thông tin thông báo</DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <NotificationForm notification={selectedNotification} onSubmit={() => setIsEditDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

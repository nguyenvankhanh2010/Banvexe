"use client"

import { useState } from "react"
import { Eye, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type Ticket = {
  id: string
  customerName: string
  phone: string
  route: string
  datetime: string
  seats: string
  paymentStatus: "paid" | "pending" | "failed"
  ticketStatus: "confirmed" | "pending" | "canceled"
}

const mockTickets: Ticket[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `BT${10000 + i}`,
  customerName: `Nguyễn Văn ${String.fromCharCode(65 + i)}`,
  phone: `098765432${i}`,
  route: i % 2 === 0 ? "Hà Nội - Hồ Chí Minh" : "Đà Nẵng - Hà Nội",
  datetime: `${(i % 12) + 1}:00 ${20 + i}/04/2025`,
  seats: `A${i + 1}, B${i + 1}`,
  paymentStatus: i % 3 === 0 ? "paid" : i % 3 === 1 ? "pending" : "failed",
  ticketStatus: i % 3 === 0 ? "confirmed" : i % 3 === 1 ? "pending" : "canceled",
}))

const paymentStatusMap = {
  paid: { label: "Đã thanh toán", variant: "success" },
  pending: { label: "Đang chờ", variant: "warning" },
  failed: { label: "Thất bại", variant: "destructive" },
}

const ticketStatusMap = {
  confirmed: { label: "Đã xác nhận", variant: "success" },
  pending: { label: "Đang chờ", variant: "warning" },
  canceled: { label: "Đã hủy", variant: "destructive" },
}

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [ticketFilter, setTicketFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  const filteredTickets = mockTickets.filter((ticket) => {
    // Search filter
    if (
      searchQuery &&
      !ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Payment status filter
    if (paymentFilter !== "all" && ticket.paymentStatus !== paymentFilter) {
      return false
    }

    // Ticket status filter
    if (ticketFilter !== "all" && ticket.ticketStatus !== ticketFilter) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý vé</h1>
        <p className="text-muted-foreground">Xem và quản lý danh sách vé đã đặt</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo mã vé hoặc tên khách hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[300px]"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Trạng thái thanh toán" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="paid">Đã thanh toán</SelectItem>
                    <SelectItem value="pending">Đang chờ</SelectItem>
                    <SelectItem value="failed">Thất bại</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={ticketFilter} onValueChange={setTicketFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Trạng thái vé" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                    <SelectItem value="pending">Đang chờ</SelectItem>
                    <SelectItem value="canceled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đặt vé</TableHead>
                  <TableHead>Tên KH</TableHead>
                  <TableHead>SĐT</TableHead>
                  <TableHead>Tuyến xe</TableHead>
                  <TableHead>Ngày giờ</TableHead>
                  <TableHead>Số ghế</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.customerName}</TableCell>
                      <TableCell>{ticket.phone}</TableCell>
                      <TableCell>{ticket.route}</TableCell>
                      <TableCell>{ticket.datetime}</TableCell>
                      <TableCell>{ticket.seats}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            paymentStatusMap[ticket.paymentStatus].variant as
                              | "default"
                              | "secondary"
                              | "destructive"
                              | "outline"
                              | "success"
                              | "warning"
                          }
                        >
                          {paymentStatusMap[ticket.paymentStatus].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ticketStatusMap[ticket.ticketStatus].variant as
                              | "default"
                              | "secondary"
                              | "destructive"
                              | "outline"
                              | "success"
                              | "warning"
                          }
                        >
                          {ticketStatusMap[ticket.ticketStatus].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedTicket(ticket)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Xem chi tiết</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      Không tìm thấy vé nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Hiển thị {filteredTickets.length} / {mockTickets.length} vé
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết vé #{selectedTicket?.id}</DialogTitle>
            <DialogDescription>Thông tin chi tiết về vé và hành khách</DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-2 font-medium">Thông tin hành khách</h3>
                  <p className="text-sm">Tên: {selectedTicket.customerName}</p>
                  <p className="text-sm">SĐT: {selectedTicket.phone}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Thông tin vé</h3>
                  <p className="text-sm">Tuyến: {selectedTicket.route}</p>
                  <p className="text-sm">Thời gian: {selectedTicket.datetime}</p>
                  <p className="text-sm">Số ghế: {selectedTicket.seats}</p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="mb-2 font-medium">Trạng thái</h3>
                <div className="flex space-x-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Thanh toán:</p>
                    <Badge
                      variant={
                        paymentStatusMap[selectedTicket.paymentStatus].variant as
                          | "default"
                          | "secondary"
                          | "destructive"
                          | "outline"
                          | "success"
                          | "warning"
                      }
                    >
                      {paymentStatusMap[selectedTicket.paymentStatus].label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vé:</p>
                    <Badge
                      variant={
                        ticketStatusMap[selectedTicket.ticketStatus].variant as
                          | "default"
                          | "secondary"
                          | "destructive"
                          | "outline"
                          | "success"
                          | "warning"
                      }
                    >
                      {ticketStatusMap[selectedTicket.ticketStatus].label}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="mb-2 font-medium">Lịch sử trạng thái</h3>
                <div className="space-y-2 rounded-md border p-2">
                  <p className="text-xs">
                    <span className="font-medium">20/04/2025 10:30</span> - Đặt vé thành công
                  </p>
                  <p className="text-xs">
                    <span className="font-medium">20/04/2025 10:35</span> - Thanh toán thành công
                  </p>
                  <p className="text-xs">
                    <span className="font-medium">20/04/2025 11:00</span> - Xác nhận vé
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline">In vé</Button>
                <Button>Cập nhật</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

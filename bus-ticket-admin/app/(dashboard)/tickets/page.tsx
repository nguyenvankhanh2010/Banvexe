"use client"

import { useEffect, useState } from "react"
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
  paymentStatus: string
  ticketStatus: string
}

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning"

const paymentStatusMap: Record<string, { label: string; variant: BadgeVariant }> = {
  paid: { label: "Đã thanh toán", variant: "success" },
  pending: { label: "Đang chờ", variant: "warning" },
  failed: { label: "Thất bại", variant: "destructive" },
  SUCCEEDED: { label: "Thành công", variant: "success" },
  WAITING_CASH: { label: "Chờ tiền mặt", variant: "warning" },
  WAITING_TRANSFER: { label: "Chờ chuyển khoản", variant: "warning" },
}

const ticketStatusMap: Record<string, { label: string; variant: BadgeVariant }> = {
  confirmed: { label: "Đã xác nhận", variant: "success" },
  pending: { label: "Đang chờ", variant: "warning" },
  canceled: { label: "Đã hủy", variant: "destructive" },
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [ticketFilter, setTicketFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  useEffect(() => {
    fetch("http://localhost:8080/api/staff/tickets")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("API response is not an array:", data)
          return
        }

        const mapped: Ticket[] = data.map((item: any) => ({
          id: item.bookingCode,
          customerName: item.customerName,
          phone: item.phone,
          route: item.route,
          datetime: new Date(item.arrivalTime).toLocaleString("vi-VN"),
          seats: item.seatNumber,
          paymentStatus: item.paymentStatus,
          ticketStatus: item.ticketStatus,
        }))
        setTickets(mapped)
      })
      .catch((err) => console.error("Error fetching tickets:", err))
  }, [])

  const filteredTickets = tickets.filter((ticket) => {
    if (
      searchQuery &&
      !ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    ) return false

    if (paymentFilter !== "all" && ticket.paymentStatus !== paymentFilter) return false
    if (ticketFilter !== "all" && ticket.ticketStatus !== ticketFilter) return false

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
                            paymentStatusMap[ticket.paymentStatus]?.variant ?? "secondary"
                          }
                        >
                          {paymentStatusMap[ticket.paymentStatus]?.label ?? ticket.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ticketStatusMap[ticket.ticketStatus]?.variant ?? "secondary"
                          }
                        >
                          {ticketStatusMap[ticket.ticketStatus]?.label ?? ticket.ticketStatus}
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
              Hiển thị {filteredTickets.length} / {tickets.length} vé
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
                        paymentStatusMap[selectedTicket.paymentStatus]?.variant ?? "secondary"
                      }
                    >
                      {paymentStatusMap[selectedTicket.paymentStatus]?.label ?? selectedTicket.paymentStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vé:</p>
                    <Badge
                      variant={
                        ticketStatusMap[selectedTicket.ticketStatus]?.variant ?? "secondary"
                      }
                    >
                      {ticketStatusMap[selectedTicket.ticketStatus]?.label ?? selectedTicket.ticketStatus}
                    </Badge>
                  </div>
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

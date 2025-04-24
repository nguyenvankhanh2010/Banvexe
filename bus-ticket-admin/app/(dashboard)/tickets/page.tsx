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
    const url = searchQuery.trim()
      ? `http://localhost:8080/api/staff/tickets/search?q=${encodeURIComponent(searchQuery)}`
      : `http://localhost:8080/api/staff/tickets`

    setTickets([])

    fetch(url)
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
  }, [searchQuery])

  const filteredTickets = tickets.filter((ticket) => {
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
            {/* Các filter giữ nguyên nếu có */}
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
                  filteredTickets.map((ticket, index) => (
                    <TableRow key={`${ticket.id}-${index}`}>
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
          <div className="mt-4 text-sm text-muted-foreground">
  Tổng số vé hiển thị: {filteredTickets.length} / {tickets.length}
</div>
</CardContent>
      </Card>
    </div>
  )
}
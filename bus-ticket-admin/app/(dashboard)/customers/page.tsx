"use client"

import { useState } from "react"
import { Eye, Search, Filter, Lock, Unlock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "blocked"
  registeredDate: string
  lastActivity: string
  totalBookings: number
}

const mockCustomers: Customer[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `CUS${10000 + i}`,
  name: `Nguyễn Văn ${String.fromCharCode(65 + i)}`,
  email: `customer${i}@example.com`,
  phone: `098765432${i}`,
  status: i % 5 === 0 ? "blocked" : i % 3 === 0 ? "inactive" : "active",
  registeredDate: `${10 + i}/01/2025`,
  lastActivity: `${15 + i}/04/2025`,
  totalBookings: i * 3 + 2,
}))

const statusMap = {
  active: { label: "Hoạt động", variant: "success" },
  inactive: { label: "Không hoạt động", variant: "warning" },
  blocked: { label: "Đã khóa", variant: "destructive" },
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = mockCustomers.filter((customer) => {
    // Search filter
    if (
      searchQuery &&
      !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !customer.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !customer.phone.includes(searchQuery)
    ) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && customer.status !== statusFilter) {
      return false
    }

    return true
  })

  const handleToggleStatus = (customer: Customer) => {
    const newStatus = customer.status === "blocked" ? "active" : "blocked"
    const action = newStatus === "blocked" ? "khóa" : "mở khóa"

    toast({
      title: `Tài khoản đã được ${action}`,
      description: `Tài khoản của ${customer.name} đã được ${action} thành công.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý khách hàng</h1>
        <p className="text-muted-foreground">Xem và quản lý thông tin khách hàng</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tên, email hoặc số điện thoại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[300px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                  <SelectItem value="blocked">Đã khóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>SĐT</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày đăng ký</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${customer.name.charAt(0)}`}
                              alt={customer.name}
                            />
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            statusMap[customer.status].variant as
                              | "default"
                              | "secondary"
                              | "destructive"
                              | "outline"
                              | "success"
                              | "warning"
                          }
                        >
                          {statusMap[customer.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.registeredDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Mở menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Xem chi tiết</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(customer)}>
                              {customer.status === "blocked" ? (
                                <>
                                  <Unlock className="mr-2 h-4 w-4" />
                                  <span>Mở khóa tài khoản</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="mr-2 h-4 w-4" />
                                  <span>Khóa tài khoản</span>
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Không tìm thấy khách hàng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết khách hàng</DialogTitle>
            <DialogDescription>Thông tin chi tiết về khách hàng và lịch sử giao dịch</DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={`/placeholder.svg?height=64&width=64&text=${selectedCustomer.name.charAt(0)}`}
                    alt={selectedCustomer.name}
                  />
                  <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedCustomer.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.id}</p>
                  <Badge
                    variant={
                      statusMap[selectedCustomer.status].variant as
                        | "default"
                        | "secondary"
                        | "destructive"
                        | "outline"
                        | "success"
                        | "warning"
                    }
                    className="mt-1"
                  >
                    {statusMap[selectedCustomer.status].label}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-2 font-medium">Thông tin liên hệ</h3>
                  <p className="text-sm">Email: {selectedCustomer.email}</p>
                  <p className="text-sm">SĐT: {selectedCustomer.phone}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Thông tin tài khoản</h3>
                  <p className="text-sm">Ngày đăng ký: {selectedCustomer.registeredDate}</p>
                  <p className="text-sm">Hoạt động gần nhất: {selectedCustomer.lastActivity}</p>
                  <p className="text-sm">Tổng số vé đã đặt: {selectedCustomer.totalBookings}</p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="mb-2 font-medium">Lịch sử giao dịch</h3>
                <div className="max-h-[200px] overflow-y-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã vé</TableHead>
                        <TableHead>Tuyến</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>BT{20000 + i}</TableCell>
                          <TableCell>{i % 2 === 0 ? "Hà Nội - Hồ Chí Minh" : "Đà Nẵng - Hà Nội"}</TableCell>
                          <TableCell>{`${15 - i}/04/2025`}</TableCell>
                          <TableCell>
                            <Badge variant={i === 0 ? "warning" : i === 4 ? "destructive" : "success"}>
                              {i === 0 ? "Đang chờ" : i === 4 ? "Đã hủy" : "Hoàn thành"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleToggleStatus(selectedCustomer)}>
                  {selectedCustomer.status === "blocked" ? (
                    <>
                      <Unlock className="mr-2 h-4 w-4" />
                      <span>Mở khóa tài khoản</span>
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Khóa tài khoản</span>
                    </>
                  )}
                </Button>
                <Button>Xem tất cả giao dịch</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

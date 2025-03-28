import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function TicketHistoryPage() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Lịch sử mua vé</CardTitle>
        <p className="text-sm text-gray-500">Theo dõi và quản lý quá trình lịch sử mua vé của bạn</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="ticket-id">Mã vé</Label>
              <Input id="ticket-id" placeholder="Nhập Mã vé" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="date">Thời gian</Label>
              <Input id="date" type="date" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="route">Tuyến đường</Label>
              <Input id="route" placeholder="Nhập tuyến đường" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Select>
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="completed">Đã hoàn thành</SelectItem>
                  <SelectItem value="pending">Đang xử lý</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-futa-orange hover:bg-futa-orange/90 gap-2">
              <Search className="h-4 w-4" />
              Tìm
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium">Mã vé</th>
                  <th className="text-left py-2 px-4 font-medium">Số vé</th>
                  <th className="text-left py-2 px-4 font-medium">Tuyến đường</th>
                  <th className="text-left py-2 px-4 font-medium">Ngày đi</th>
                  <th className="text-left py-2 px-4 font-medium">Số tiền</th>
                  <th className="text-left py-2 px-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td colSpan={6} className="py-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-gray-400 mb-2">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 9V15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 12H16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500">No Data</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="bg-futa-orange text-white hover:bg-futa-orange/90">
              Đặt vé
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


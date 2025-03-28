import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"

const routes = [
  {
    id: 1,
    from: "An Khê (Gia Lai)",
    to: "TP.Hồ Chí Minh",
    type: "Limousine",
    distance: "640km",
    duration: "13 giờ",
    price: "---",
  },
  {
    id: 2,
    from: "An Khê (Gia Lai)",
    to: "TP.Hồ Chí Minh",
    type: "Limousine",
    distance: "690km",
    duration: "14 giờ",
    price: "---",
  },
  {
    id: 3,
    from: "An Minh (Kiên Giang)",
    to: "TP.Hồ Chí Minh",
    type: "Limousine",
    distance: "295km",
    duration: "7 giờ",
    price: "---",
  },
  {
    id: 4,
    from: "An Nhơn",
    to: "TP.Hồ Chí Minh",
    type: "Giường",
    distance: "639km",
    duration: "11 giờ 30 phút",
    price: "---",
  },
  {
    id: 5,
    from: "An Nhơn",
    to: "TP.Hồ Chí Minh",
    type: "Giường",
    distance: "660km",
    duration: "13 giờ 46 phút",
    price: "---",
  },
  {
    id: 6,
    from: "An Nhơn",
    to: "TP.Hồ Chí Minh",
    type: "---",
    distance: "627km",
    duration: "10 giờ 7 phút",
    price: "---",
  },
  {
    id: 7,
    from: "Bạc Liêu",
    to: "TP.Hồ Chí Minh",
    type: "Giường",
    distance: "271km",
    duration: "6 giờ",
    price: "---",
  },
  {
    id: 8,
    from: "Bạc Liêu",
    to: "TP.Hồ Chí Minh",
    type: "Limousine",
    distance: "243km",
    duration: "5 giờ",
    price: "---",
  },
  {
    id: 9,
    from: "Bảo Lộc",
    to: "Bình Sơn",
    type: "Limousine",
    distance: "650km",
    duration: "15 giờ 30 phút",
    price: "---",
  },
  {
    id: 10,
    from: "Bảo Lộc",
    to: "Đà Nẵng",
    type: "Giường",
    distance: "756km",
    duration: "16 giờ 38 phút",
    price: "---",
  },
  {
    id: 11,
    from: "Bảo Lộc",
    to: "Huế",
    type: "Giường",
    distance: "827km",
    duration: "19 giờ",
    price: "---",
  },
]

export default function SchedulePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Nhập điểm đi" className="pl-10" />
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Nhập điểm đến" className="pl-10" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-5 bg-gray-100 p-4 text-sm font-medium border-b">
              <div>Tuyến xe</div>
              <div>Loại xe</div>
              <div>Quãng đường</div>
              <div>Thời gian hành trình</div>
              <div>Giá vé</div>
            </div>

            <div className="divide-y">
              {routes.map((route) => (
                <div key={route.id} className="grid grid-cols-5 p-4 items-center text-sm hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-futa-orange">{route.from}</span>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <span className="font-medium">{route.to}</span>
                  </div>
                  <div>{route.type}</div>
                  <div>{route.distance}</div>
                  <div>{route.duration}</div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{route.price}</span>
                    <Button
                      className="rounded-full bg-orange-100 hover:bg-orange-200 text-futa-orange text-xs px-4 py-1 h-auto"
                      asChild
                    >
                      <Link href={`/lich-trinh/${route.id}`}>Tìm tuyến xe</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


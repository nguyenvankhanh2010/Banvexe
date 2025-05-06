import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gray-50 py-8">
          <div className="container">
            <h1 className="text-3xl font-bold text-center text-futa-green mb-8">LIÊN HỆ VỚI CHÚNG TÔI</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-futa-orange mb-4">
                    CÔNG TY CỔ PHẦN VIETBUS
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Địa chỉ:</p>
                        <p>Số 01 Võ Văn Ngân, Phường Linh Trung, Thành phố Thủ Đức, Việt Nam.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Email:</p>
                        <Link href="mailto:hotro@vietbus.vn" className="text-futa-orange hover:underline">
                          hotro@vietbus.vn
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Điện thoại:</p>
                        <p>0299599789</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Fax:</p>
                        <p>0299599789</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Hotline:</p>
                        <p className="text-futa-orange font-bold">22110XXX</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Website:</p>
                        <Link href="https://vietbus.vn" className="text-futa-orange hover:underline">
                          https://vietbus.vn
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        <div className="py-8">
          <div className="container">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Số+01+Võ+Văn+Ngân,+Phường+Linh+Trung,+Thành+phố+Thủ+Đức,+Việt+Nam&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


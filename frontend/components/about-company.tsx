import Image from "next/image"

export function AboutCompany() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-futa-orange">VIETBUS</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-2">"Chất lượng là danh dự"</p>
      </div>

      <div className="space-y-12">
        {/* Company History */}
        <div className="prose max-w-none">
          <p className="text-base leading-relaxed">
            Vietbus được thành lập năm 2004. Với hoạt động kinh doanh chính trong lĩnh vực
            mua bán xe ô tô, vận tải hành khách, bất động sản và kinh doanh dịch vụ. Vietbus dần trở thành cái tên
            quen thuộc đồng hành cùng người Việt trên mọi lĩnh vực.
          </p>
          <p className="text-base leading-relaxed">
            Trải qua hơn 21 năm hình thành và phát triển đặt khách hàng là trọng tâm, chúng tôi tự hào trở thành doanh
            nghiệp vận tải hàng đầu cống góp tích cực vào sự phát triển chung của ngành vận tải nói riêng và nền kinh tế
            đất nước nói chung. Luôn cải tiến mang đến chất lượng dịch vụ tốt và nhất dành cho khách hàng, Vietbus được ghi nhận qua nhiều giải thưởng danh giá như "Thương hiệu số 1 Việt Nam", "Top 1 Thương
            hiệu mạnh ASEAN 2024", "Top 5 Sản phẩm dịch vụ chất lượng ASEAN 2024" "Top 10 Thương hiệu dẫn đầu Việt Nam
            2024", "Top 10 Thương hiệu mạnh Quốc gia 2024", "Top 10 thương hiệu uy tín hàng đầu ASEAN 2024", "Top 10
            Thương hiệu Quốc gia hội nhập Châu Á - Thái Bình Dương 2024"...
          </p>
        </div>

        {/* Vision and Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[300px] order-2 md:order-1">
            <Image src="/images/vechungtoi1.png" alt="Tầm nhìn và sứ mệnh" fill className="object-contain" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-futa-orange mb-4">TẦM NHÌN VÀ SỨ MỆNH</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold text-futa-orange">BÁO ĐÁP TỔ QUỐC VÌ MỘT VIỆT NAM HÙNG CƯỜNG.</h3>
              <p className="font-medium">Trở thành Tập Đoàn uy tín và chất lượng hàng đầu Việt Nam với cam kết:</p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-2">
                  <span className="text-futa-orange font-bold">•</span>
                  <span>Tạo môi trường làm việc năng động, thân thiện.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-futa-orange font-bold">•</span>
                  <span>Phát triển từ lòng tin của khách hàng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-futa-orange font-bold">•</span>
                  <span>Trở thành tập đoàn dẫn đầu chuyên nghiệp.</span>
                </li>
              </ul>
              <p className="mt-4">
                <span className="text-futa-orange font-medium">Vietbus</span> luôn phấn đấu làm việc hiệu quả nhất,
                để luôn cống hiến, đóng góp hết sức mình vì một Việt Nam hùng cường.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-futa-orange mb-4">GIÁ TRỊ CỐT LÕI</h2>
            <p className="mb-4">
              <span className="font-medium">Giá trị cốt lõi – </span>
              <span className="text-futa-orange font-medium">Vietbus</span>
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-futa-orange font-bold">•</span>
                  <span>
                    <span className="text-futa-orange font-bold">Viet:</span> Thể hiện niềm tự hào là thương hiệu Việt Nam – năng động, sáng tạo và hội nhập. VietBus không chỉ đại diện cho bản sắc dân tộc mà còn đề cao các giá trị đạo đức như sự chính trực, minh bạch và công bằng trong mọi hành động, với đồng nghiệp, khách hàng và đối tác.
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-futa-orange font-bold">•</span>
                  <span>
                    <span className="text-futa-orange font-bold">Bus:</span> Là biểu tượng của ngành vận tải hành khách, gắn liền với khát vọng vươn xa, phục vụ tận tâm và không ngừng đổi mới để đem lại những trải nghiệm tốt nhất. VietBus hướng tới thành công bền vững và đóng góp tích cực cho cộng đồng, xã hội.
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-futa-orange font-bold">•</span>
                  <span>
                    <span className="text-futa-orange font-bold">VietBus:</span> Là sự kết hợp giữa tinh thần Việt Nam và sứ mệnh phục vụ ngành vận tải. Càng phát triển, VietBus càng giữ vững giá trị "CHÍNH TRỰC", trở thành biểu tượng cho sự phát triển bền vững trên nền tảng đạo đức và niềm tự hào dân tộc.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[300px]">
            <Image src="/images/vechungtoi2.png" alt="Giá trị cốt lõi" fill className="object-contain" />
          </div>
        </div>

        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[300px] order-2 md:order-1">
            <Image src="/images/vechungtoi3.png" alt="Triết lý" fill className="object-contain" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-futa-orange mb-4">TRIẾT LÝ</h2>
            <div className="prose max-w-none">
              <p className="text-base leading-relaxed">
                Hội nhập và phát triển góp phần vào sự thịnh vượng của đất nước. Nguồn nhân lực chính là nhân tố then
                chốt, là tài sản lớn nhất của Vietbus, chú trọng tạo ra môi trường làm việc hiện đại, năng
                động, thân thiện và trao cơ hội phát triển nghề nghiệp cho tất cả thành viên. Sự hài lòng của khách hàng
                là minh chứng cho chất lượng dịch vụ của Vietbus. Không ngừng hoàn thiện và phát triển năng lực
                kinh doanh, Vietbus thấu hiểu nhu cầu khách hàng, mang đến sản phẩm dịch vụ hoàn hảo, đáp ứng tối
                đa mong đợi của khách hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


import { NextResponse } from "next/server"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export interface BookTicketRequest {
  seatId: number;
  tripId: number;
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Booking ticket:', body)

    // Validate required fields
    if (!body.seatId || !body.tripId || !body.passengerName || !body.passengerPhone || !body.passengerEmail) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin đặt vé" },
        { status: 400 }
      )
    }

    // First, check seat availability
    const seatCheckResponse = await fetch(`${backendUrl}/api/seats/check/${body.seatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Disable caching
    })

    const seatData = await seatCheckResponse.json()
    if (!seatCheckResponse.ok || !seatData.available) {
      return NextResponse.json(
        { error: "Ghế đã được đặt, vui lòng chọn ghế khác" },
        { status: 400 }
      )
    }

    // Format the request body according to the backend API requirements
    const bookingRequest = {
      seatId: Number(body.seatId),
      tripId: Number(body.tripId),
      passengerName: body.passengerName,
      passengerPhone: body.passengerPhone,
      passengerEmail: body.passengerEmail
    }

    // Create booking
    const bookingResponse = await fetch(`${backendUrl}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingRequest)
    })

    const bookingData = await bookingResponse.json()
    console.log('Booking response:', {
      status: bookingResponse.status,
      ok: bookingResponse.ok,
      data: bookingData
    })

    if (!bookingResponse.ok) {
      let errorMessage = "Không thể đặt vé. Vui lòng thử lại sau."
      if (bookingData.error) {
        errorMessage = bookingData.error
      } else if (bookingData.message) {
        errorMessage = bookingData.message
      }
      return NextResponse.json({ error: errorMessage }, { status: bookingResponse.status })
    }

    // Return success response with booking details
    return NextResponse.json({
      success: true,
      ticket: bookingData.data,
      message: bookingData.message || "Đặt vé thành công"
    })

  } catch (error) {
    console.error('Error booking ticket:', error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi đặt vé. Vui lòng thử lại sau." },
      { status: 500 }
    )
  }
}


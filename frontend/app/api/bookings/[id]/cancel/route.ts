import { NextRequest, NextResponse } from "next/server"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id
    
    console.log('=== Starting direct ticket cancellation process ===')
    console.log('Booking ID:', bookingId)
    
    // Call direct booking cancellation API
    const apiUrl = `${backendUrl}/api/bookings/${bookingId}/cancel`
    console.log('Calling cancellation API at:', apiUrl)
    
    // Make the request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    console.log('Response status:', response.status)
    console.log('Response status text:', response.statusText)
    
    const responseText = await response.text()
    console.log('Raw response:', responseText)
    
    let data
    try {
      data = responseText ? JSON.parse(responseText) : null
    } catch (error) {
      console.error('Failed to parse response as JSON:', error)
      console.log('Raw response was:', responseText)
      
      // Return a generic success response if we can't parse the JSON
      if (response.ok) {
        return NextResponse.json({
          message: 'Booking cancelled successfully',
          details: 'Backend returned success but no JSON content',
          timestamp: new Date().toISOString()
        })
      }
    }
    
    if (!response.ok) {
      console.error('Cancellation failed with status:', response.status)
      return NextResponse.json(
        { 
          error: 'Failed to cancel booking',
          details: data?.message || data?.error || 'Backend returned error',
          timestamp: new Date().toISOString()
        },
        { status: response.status }
      )
    }
    
    console.log('=== Booking cancellation successful ===')
    
    return NextResponse.json({
      message: 'Booking cancelled successfully',
      details: data?.message || 'Backend returned success',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('=== Booking cancellation failed with exception ===')
    console.error('Error details:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to cancel booking',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 
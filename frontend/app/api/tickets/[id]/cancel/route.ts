import { NextRequest, NextResponse } from "next/server"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticketId = params.id
    const apiUrl = `${backendUrl}/api/bookings/${ticketId}/cancel`
    
    console.log('=== Starting ticket cancellation process ===')
    console.log('Ticket ID:', ticketId)
    console.log('Backend API URL:', apiUrl)

    // Call backend API to cancel the ticket
    console.log('Sending request to backend...')
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })

    console.log('Backend response received')
    console.log('Status:', response.status)
    console.log('Status Text:', response.statusText)
    console.log('Headers:', Object.fromEntries(response.headers.entries()))
    
    const responseText = await response.text()
    console.log('Raw response body:', responseText)
    
    let data
    try {
      data = JSON.parse(responseText)
      console.log('Parsed response data:', data)
    } catch (e) {
      console.error('Failed to parse JSON response:', e)
      console.error('Raw response was:', responseText)
      throw new Error('Invalid JSON response from backend')
    }

    if (!response.ok) {
      console.error('Backend error response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data
      })
      
      return NextResponse.json(
        { 
          error: 'Failed to cancel ticket',
          details: data?.message || data?.error || `Backend request failed: ${response.status} ${response.statusText}`,
          timestamp: new Date().toISOString()
        },
        { status: response.status }
      )
    }

    console.log('=== Ticket cancellation successful ===')
    return NextResponse.json({
      message: 'Ticket cancelled successfully',
      data
    })
  } catch (error) {
    console.error('=== Ticket cancellation failed ===')
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to cancel ticket',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 
import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

function parseBackendDateTime(dateTimeStr: string): string {
    try {
        if (!dateTimeStr) return new Date().toISOString();
        
        // The backend sends dates in format: "yyyy-MM-dd HH:mm:ss.SSSSSS"
        // First, remove the microseconds part
        const withoutMicroseconds = dateTimeStr.split('.')[0];
        
        // Convert to ISO format without forcing UTC (no 'Z' suffix)
        const isoFormat = withoutMicroseconds.replace(' ', 'T');
        
        // Create date object in local timezone
        const date = new Date(isoFormat);
        
        console.log('Parsing date:', {
            input: dateTimeStr,
            withoutMicroseconds,
            isoFormat,
            localString: date.toString()
        });
        
        // Return ISO string but preserve the local timezone
        return isoFormat;
    } catch (e) {
        console.error('Error parsing date:', e, 'for input:', dateTimeStr);
        return new Date().toISOString();
    }
}

export async function GET() {
    try {
        // Hardcoded customer ID 3 for now
        const customerId = 3;
        const url = `${backendUrl}/api/bookings/customer/${customerId}`;
        
        console.log('=== Fetching Booking History ===');
        console.log('Backend URL:', url);
        
        // Fetch bookings
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            cache: 'no-store' // Disable caching to always get fresh data
        });

        console.log('Response status:', response.status);
        
        const responseText = await response.text();
        console.log('Raw response:', responseText);
        
        let rawData;
        try {
            rawData = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse JSON response:', e);
            throw new Error('Invalid JSON response from backend');
        }

        if (!response.ok) {
            console.error('Backend error response:', {
                status: response.status,
                statusText: response.statusText,
                data: rawData
            });
            throw new Error(
                rawData?.message || 
                rawData?.error || 
                `Backend request failed: ${response.status} ${response.statusText}`
            );
        }

        console.log('Raw backend response:', rawData);

        // Transform the data to match frontend structure
        const transformedData = Array.isArray(rawData) ? rawData.map((booking: any) => {
            console.log('Processing booking:', booking); // Log each booking for debugging
            
            // Parse dates using the helper function
            const bookingDateTime = parseBackendDateTime(booking.bookingTime);
            const departureTime = parseBackendDateTime(booking.departureTime);
            
            console.log('Parsed dates:', {
                original: {
                    bookingTime: booking.bookingTime,
                    departureTime: booking.departureTime
                },
                parsed: {
                    bookingDateTime,
                    departureTime
                }
            });

            return {
                id: booking.id,
                bookingCode: booking.id.toString(),
                bookingDateTime,
                cost: booking.price || 0,
                status: booking.status || 'UNKNOWN',
                seat: {
                    seatNumber: booking.seatNumber || 'N/A'
                },
                trip: {
                    origin: booking.origin || 'N/A',
                    destination: booking.destination || 'N/A',
                    departureTime
                }
            };
        }) : [];

        console.log('Transformed data:', transformedData);
        return NextResponse.json(transformedData);
    } catch (error) {
        console.error('Error in booking history API:', error);
        // Return more detailed error information
        return NextResponse.json(
            { 
                error: 'Failed to fetch ticket history',
                details: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
} 
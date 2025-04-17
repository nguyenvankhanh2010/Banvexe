interface Trip {
    origin: string;
    destination: string;
    departureTime: string;
}

interface Seat {
    seatNumber: string;
}

interface Ticket {
    id: number;
    bookingCode: string;
    bookingDateTime: string;
    cost: number;
    status: string;
    seat: Seat;
    trip: Trip;
}

function formatDateTime(isoString: string): string {
    try {
        if (!isoString) return 'Invalid date';
        
        // Parse the ISO string to a Date object
        const date = new Date(isoString);
        
        // Format for Vietnam timezone
        return new Intl.DateTimeFormat('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: false,
            timeZone: 'Asia/Ho_Chi_Minh'
        }).format(date);
    } catch (error) {
        console.error('Error formatting date:', error, 'for input:', isoString);
        return 'Invalid date';
    }
}

export default async function BookingHistory() {
    const response = await fetch('http://localhost:3000/api/tickets/history', {
        cache: 'no-store'
    });
    const data = await response.json();
    
    // Add logging to check the received dates
    console.log('Received booking data:', data.map((ticket: Ticket) => ({
        id: ticket.id,
        bookingDateTime: ticket.bookingDateTime,
        departureTime: ticket.trip?.departureTime,
        formattedBookingTime: formatDateTime(ticket.bookingDateTime),
        formattedDepartureTime: formatDateTime(ticket.trip?.departureTime)
    })));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Lịch sử đặt vé</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mã đặt vé
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thời gian đặt
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thời gian khởi hành
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tổng tiền
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((ticket: Ticket) => (
                            <tr key={ticket.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {ticket.bookingCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {formatDateTime(ticket.bookingDateTime)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {formatDateTime(ticket.trip.departureTime)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ticket.cost)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        ticket.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                        ticket.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                        ticket.status === 'WAITING' ? 'bg-yellow-100 text-yellow-800' :
                                        ticket.status === 'CANCELLED' || ticket.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {ticket.status === 'CONFIRMED' ? 'Hoạt động' :
                                         ticket.status === 'ACTIVE' ? 'Hoạt động' :
                                         ticket.status === 'WAITING' ? 'Chờ xử lý' :
                                         ticket.status === 'CANCELLED' || ticket.status === 'CANCELED' ? 'Đã hủy' :
                                         ticket.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {(ticket.status === 'CONFIRMED' || ticket.status === 'ACTIVE' || ticket.status === 'WAITING') && (
                                        <button
                                            onClick={async () => {
                                                console.log('Ticket details for cancel:', {
                                                    id: ticket.id,
                                                    bookingCode: ticket.bookingCode,
                                                    status: ticket.status
                                                });
                                                if (confirm(`Bạn có chắc chắn muốn hủy vé ${ticket.bookingCode} không?`)) {
                                                    try {
                                                        console.log('Cancelling ticket with ID:', ticket.id);
                                                        const response = await fetch(`/api/bookings/${ticket.id}/cancel`, {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            }
                                                        });
                                                        
                                                        console.log('Cancellation response status:', response.status);
                                                        const data = await response.json();
                                                        console.log('Cancellation response:', data);
                                                        
                                                        if (!response.ok) {
                                                            throw new Error(data.details || data.error || 'Có lỗi xảy ra khi hủy vé');
                                                        }
                                                        
                                                        alert('Hủy vé thành công!');
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error('Error cancelling ticket:', error);
                                                        alert(error instanceof Error ? error.message : 'Có lỗi xảy ra khi hủy vé. Vui lòng thử lại sau.');
                                                    }
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-900 px-4 py-2 rounded-md border border-red-600 hover:bg-red-50"
                                        >
                                            Hủy vé
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 
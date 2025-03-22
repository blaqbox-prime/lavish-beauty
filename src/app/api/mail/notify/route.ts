import BookingService from "@/services/BookingsService";
import { sendNotification } from "@/services/MailServices";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get('id');
  const bookingService = new BookingService();


  if (!bookingId) {
    return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
  }

  const booking = await bookingService.getBookingByID(bookingId);
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const response = await sendNotification(booking);
  return NextResponse.json(response);
}
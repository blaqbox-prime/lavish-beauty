import { BookingNotification } from "@/emails/BookingNotification";
import { getBookingByID } from "@/services/BookingsService";
import { sendBookingReminder, sendNotification } from "@/services/MailServices";
import { BookingRecord } from "@/types";
import { APIResponse } from "mailersend/lib/services/request.service";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const booking_id = searchParams.get('id');

    if (booking_id) {
        const booking: BookingRecord | null = await getBookingByID(booking_id);

        if (booking) { // Check if booking is not null before sending reminder
            const response = await sendBookingReminder(booking);
            return NextResponse.json(response);
        }
        return NextResponse.json({"message": "No booking matches id provided"});
    }
    return NextResponse.json({"message": "No booking id provided"});
}

import supabase from "@/database/supabase";
import BookingService from "@/services/BookingsService";


jest.mock("../../src/database/supabase");

describe("BookingService", () => {
    let bookingService: BookingService;

    beforeEach(() => {
        bookingService = new BookingService();
    });

    describe("getUpcomingBookings", () => {
        it("should return upcoming bookings", async () => {
            const mockData = [{ id: 1, booking_date: "2025-03-25", status: "confirmed" }];
            // @ts-ignore
            supabase.from.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                gte: jest.fn().mockReturnThis(),
                not: jest.fn().mockReturnThis(),
                order: jest.fn().mockReturnValue({ data: mockData, error: null }),
            });

            const bookings = await bookingService.getUpcomingBookings();

            expect(bookings).toEqual(mockData);
            expect(supabase.from).toHaveBeenCalledWith("bookings");
        });

        it("should throw an error if fetching fails", async () => {
            // @ts-ignore
            supabase.from.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                gte: jest.fn().mockReturnThis(),
                not: jest.fn().mockReturnThis(),
                order: jest.fn().mockReturnValue({ data: null, error: { message: "Error fetching bookings" } }),
            });

            await expect(bookingService.getUpcomingBookings()).rejects.toThrow("Error fetching bookings");
        });
    });

    describe("getBookingDetails", () => {
        it("should return booking details and services", async () => {
            const mockBooking = { id: 1, customer: { name: "John Doe" } };
            const mockServices = [{ id: 1, service: { name: "Service A" } }];
            // @ts-ignore
            supabase.from.mockImplementation((table) => {
                if (table === "bookings") {
                    return {
                        select: jest.fn().mockReturnThis(),
                        eq: jest.fn().mockReturnThis(),
                        single: jest.fn().mockReturnValue({ data: mockBooking, error: null })
                    };
                }
                if (table === "booked_service") {
                    return {
                        select: jest.fn().mockReturnThis(),
                        eq: jest.fn().mockReturnThis(),
                        single: jest.fn().mockReturnValue({ data: mockBooking, error: null })
                    };
                }
            });

            const { booking, services } = await bookingService.getBookingDetails(1);

            expect(booking).toEqual(mockBooking);
            expect(services).toEqual(mockServices);
        });

        it("should throw an error if fetching details fails", async () => {
            // @ts-ignore
            supabase.from.mockImplementation((table) => {
                if (table === "bookings") {
                    return {
                        select: jest.fn().mockReturnThis(),
                        eq: jest.fn().mockReturnValue({ data: null, error: { message: "Failed to fetch booking details" } }),
                    };
                }
                if (table === "booked_service") {
                    return {
                        select: jest.fn().mockReturnThis(),
                        eq: jest.fn().mockReturnValue({ data: null, error: {message: "Failed to fetch booking details"} }),
                    };
                }
            });

            await expect(bookingService.getBookingDetails(1)).rejects.toThrow("Failed to fetch booking details");
        });
    });
});
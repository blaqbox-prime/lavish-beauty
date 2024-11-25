
import { useState, useEffect, useMemo } from 'react';
import { useBookings } from '@/zustand/store';
import { BookingRecord } from '@/types';
import _ from 'lodash';
import { isAfter, isBefore } from '@formkit/tempo';

export const useBookingsView = () => {
  const loading = useBookings((state: any) => state.loading);
  const fromDate = useBookings((state: any) => state.startDate);
  const toDate = useBookings((state: any) => state.endDate);
  const getBookings = useBookings((state: any) => state.getBookings);
  const bookings = useBookings((state: any) => state.bookings);

  const [searchText, setSearchText] = useState("");

  const filteredBookings = useMemo(() => 
    fromDate && toDate
      ? _.filter(
          bookings,
          (booking: BookingRecord) =>
            isAfter(booking.booking_date, fromDate) &&
            isBefore(booking.booking_date, toDate)
        )
      : bookings,
    [bookings, fromDate, toDate]
  );

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    console.log(e.target.value);
  };

  return {
    loading,
    fromDate,
    toDate,
    bookings,
    searchText,
    setSearchText,
    filteredBookings,
    handleSearch
  };
};


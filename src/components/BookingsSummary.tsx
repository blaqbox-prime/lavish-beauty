import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { getAllBookings } from '@/services/BookingsService'
import { BookingRecord, CustomerRecord } from '@/types'

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { format } from '@formkit/tempo'
import StatusBadge from './StatusBadge'
import { Checkbox } from './ui/checkbox'
import DataTable from './DataTable'

type Props = {
    
}



async function BookingsSummary({}: Props) {
  
    const data = await getAllBookings();
  
    return (
    <Card>
        <CardHeader>
        <CardTitle className="text-xl">Latest Bookings</CardTitle>
        <CardDescription>Manage your bookings</CardDescription>
      </CardHeader>

        <CardContent>
            <DataTable data={data}/>
        </CardContent>

    </Card>
  )
}

export default BookingsSummary
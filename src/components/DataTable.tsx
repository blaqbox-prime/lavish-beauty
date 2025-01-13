'use client'
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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { format } from '@formkit/tempo'
import StatusBadge from './StatusBadge'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import Link from 'next/link'

type Props = {
    data: any[]
}


export const columns: ColumnDef<BookingRecord>[] = [
    
    {
        accessorKey: "customer",
        header: "Client",
        cell: ({ row }) => {

            const customer: CustomerRecord = row.getValue("customer")

           return <div className="capitalize">{customer.name}</div>
        },
      },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize"><StatusBadge status={row.getValue("status")}/></div>
      ),
    },
    {
      accessorKey: "booking_date",
      header: ({ column }) => {
       
       
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Appointment date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const booking_date: Date = row.getValue("booking_date")
        return <div className="text-left">{format(booking_date, "full")}</div>
    },
    },
    {
      accessorKey: "booking_date",
      header: () => <div className="text-right">Time</div>,
      cell: ({ row }) => {
        const booking_date: Date = row.getValue("booking_date")
  
        
        return <div className="text-right font-medium">{format(booking_date, {time: "short"})}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const booking = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(booking.booking_date)}
              >
                Confirm Appointment
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`/admin/clients/${booking.customer_id}`}>
              < DropdownMenuItem>View client </DropdownMenuItem>
              </Link>

                <Link href={`/admin/bookings/${booking.id}`}>
              <DropdownMenuItem>View booking details</DropdownMenuItem>
                </Link>

                { booking.status !== 'cancelled' && <DropdownMenuItem className="bg-red-600 text-white">Cancel Appointment</DropdownMenuItem>}

              
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

function DataTable({data}: Props) {
  
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
  
    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      initialState: {pagination: {pageSize: 5}},
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })
  
    return (
    <>
     <div className="mb-4 flex items-center gap-4">
          <Input
            placeholder="Filter clients..."
            value={(table.getColumn("customer")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("customer")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4">
         
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
    </>
  )
}

export default DataTable
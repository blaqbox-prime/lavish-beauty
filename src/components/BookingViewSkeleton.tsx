import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import _ from 'lodash'
import React from 'react'

type Props = {}

const BookingViewSkeleton = (props: Props) => {
  return (
    <div className='w-full h-full flex flex-col gap-4'>

        {/* Filters Skeleton */}

        <Skeleton className='w-full h-4'/>
        <Skeleton className='w-full h-4'/>

        {/* TABLE SKELETON */}
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead><Skeleton className='w-full h-4' /></TableHead>
                <TableHead><Skeleton className='w-full h-4' /></TableHead>
                <TableHead><Skeleton className='w-full h-4' /></TableHead>
                <TableHead><Skeleton className='w-full h-4' /> </TableHead>
                <TableHead><Skeleton className='w-full h-4' /></TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {_.toArray([1,2,3,4,5]).map((number) => (
                <TableRow key={number}>
                    <TableCell><Skeleton className='w-full h-4' /></TableCell>
                    <TableCell><Skeleton className='w-full h-4' /></TableCell>
                    <TableCell><Skeleton className='w-full h-4' /></TableCell>
                    <TableCell><Skeleton className='w-full h-4' /></TableCell>
                    <TableCell>
                    <Skeleton className='w-full h-4' />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </div>
  )
}

export default BookingViewSkeleton
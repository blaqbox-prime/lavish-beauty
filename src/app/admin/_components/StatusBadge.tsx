import { Badge } from '@/components/ui/badge'
import React from 'react'

type TStatusBadge = {
    status: string
}

export default function StatusBadge({status}: TStatusBadge) {
  return (
    <Badge
                    className={` text-ellipsis ${status == 'Confirmed' && 'bg-green-600 hover:bg-green-500'}
                    ${status == 'Pending deposit' && 'bg-orange-600 hover:bg-orange-500'}
                    ${status == 'Cancelled' && 'bg-red-600 hover:bg-red-500'}`}
                    >{status == 'Pending deposit' ? 'Pending' : status}</Badge>
  )
}
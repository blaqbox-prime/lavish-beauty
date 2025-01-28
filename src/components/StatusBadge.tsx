import { Badge } from '@/components/ui/badge'
import { Status } from '@/types'
import _ from 'lodash'
import React from 'react'

type TStatusBadge = {
    status: Status
}

export default function StatusBadge({status}: TStatusBadge) {
  return (
    <Badge
                    className={` text-ellipsis ${status == 'confirmed' && 'bg-amber-600 hover:bg-amber-500'}
                    ${status == 'pending' && 'bg-orange-600 hover:bg-orange-500'}
                    ${status == 'cancelled' && 'bg-red-600 hover:bg-red-500'}
                    ${status == 'completed' && 'bg-green-600 hover:bg-green-500'}
                    ${status == 'missed' && 'bg-slate-600 hover:bg-slate-500'}`}
                    >
                      {status == 'pending' ? 'Pending' : _.capitalize(status)}
                    </Badge>
  )
}
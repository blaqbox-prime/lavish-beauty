import { ZAR } from '@/lib/utils'
import { getTotalRevenue } from '@/services/InvoiceService'
import React from 'react'

type Props = {}

async function TotalRevenue({}: Props) {

    const totalRevenue = await getTotalRevenue()

  return (
    <h4 className='text-2xl md:text-4xl font-black transition-all'>{ZAR.format(totalRevenue || 0.0)}</h4>
  )
}

export default TotalRevenue
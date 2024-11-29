'use client'


import { BookingRecord, ClientRecord } from '@/types'
import _ from 'lodash'
import React from 'react'
import BookingCard from './BookingCard'
import { useClients } from '@/zustand/store'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ClientCard from './ClientCard'

type TCardListOfClients = {
    clients: ClientRecord[]
}

export default function CardListOfClients({clients = []}: TCardListOfClients) {
  
    const NUM_PAGES = clients.length / 10;
    const page = useClients((state: any) => state.page)
    const start = useClients((state: any) => state.start)
    const setPage = useClients((state: any) => state.setPage)
    const setStart = useClients((state: any) => state.setStart)
  
    return (
    <section className='md:hidden gap-4 flex flex-col mt-3'>
          {_.slice(clients,start,page * 10).map((client: ClientRecord) =>(
          <Link href={`/admin/clients/${client.id}`} key={client.id.toString()}>
          <ClientCard client={client} />
          </Link>
        ))}
        <div className='flex p-2 gap-4 items-center justify-center w-full '>
                <ArrowLeft className={`cursor-pointer ${page <= 1 && 'cursor-default pointer-events-none opacity-0'}`} 
                onClick={() => {
                    if(page > 1){
                        setStart(start - 10)
                    setPage(page - 1)
                    }
                }}/>
                <p>{page}</p>
                <ArrowRight className={`cursor-pointer ${page >= NUM_PAGES && 'cursor-default pointer-events-none opacity-0'}`}
                    onClick={() => {
                        if(page < NUM_PAGES){
                            setStart(start + 10)
                        setPage(page + 1)
                        }
                    }}
                    />
            </div>

    </section>
  )
}
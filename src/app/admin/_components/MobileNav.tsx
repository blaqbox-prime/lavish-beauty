"use client"

import Logo from '@/components/Logo'
import { AlignRight, BookOpenText, Home, Palette, Table, User } from 'lucide-react'
import React, { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import Link from 'next/link'

interface IMobileNav {
    className?: string
}

export default function MobileNav({className=""}: IMobileNav) {

    const [activeTab, setActiveTab] = useState(0)

    const icons = [
        { title: 'Home' , link:"/admin/dashboard" ,icon : (<Home
          className={`text-slate-400 hover:text-slate-500 transition-all duration-300 ${
            0 == activeTab && "text-pink-700"
          } `}
          size={16}
        />),},
    
        {title: "Bookings" , link:"/admin/bookings" ,icon:(<BookOpenText
          className={`text-slate-400  hover:text-slate-500 transition-all duration-300 ${
            1 == activeTab && "text-pink-700"
          } `}
          size={16}
        />)},
    
        {title: 'Services' , link:"/admin/services" ,icon: (<Palette
          className={`text-slate-400  hover:text-slate-500 transition-all duration-300 ${
            2 == activeTab && "text-pink-700"
          } `}
          size={16}
        />)},
    
        
        { title: 'Clients' ,link:"/admin/clients" , icon:(<User
          className={`text-slate-400  hover:text-slate-500 transition-all duration-300 ${
            3 == activeTab && "text-pink-700"
          } `}
          size={16}
        />)},
    
        {title: 'Invoices' , link:"/admin/invoices" ,icon:(<Table
          className={`text-slate-400  hover:text-slate-500 transition-all duration-300 ${
            4 == activeTab && "text-pink-700"
          } `}
          size={16}
        />)},
      ];    

  return (
    <nav className={`${className} p-4 flex items-center justify-between`}>
        <Logo />
        <Drawer>
  <DrawerTrigger><AlignRight /></DrawerTrigger>
  <DrawerContent className='flex flex-col gap-6 mb-4 pr-4'>
  {icons.map((icon, idx) => (
        <Link
        href={icon.link}
          onClick={() => {
            setActiveTab(idx);
          }}
          key={idx}
          className={`cursor-pointer text-slate-400 px-5 ${
            idx == activeTab && " border-r-2 border-pink-700 text-pink-700"
          } transition-all duration-200 flex items-center font-medium gap-4`}
        >
          {icon.icon}
          <p>{icon.title}</p>
        </Link>
      ))}
  </DrawerContent>
</Drawer> 
    </nav>
  )
}
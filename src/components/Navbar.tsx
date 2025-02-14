'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const navItems = ["Home", "Services", "Gallery" ,"About Us", "Contact"]

function Navbar({}: Props) {

    const [activeTab, setActiveTab] = React.useState(0)

    const handleClick = (index: number) => {
        setActiveTab(index)
    }

  return (
    <nav className='flex flex-col items-center justify-center gap-2 py-4'>
        <Image src="/logo-transparent-2.png"
        alt='logo'
        width={200}
        height={300}
        />

        <ul className='flex items-center gap-8'>
           {
             navItems.map((item, index) => (
                 <li key={index} className={`border p-2 transition-all border-transparent hover:text-amber-800 ${activeTab === index? 'text-amber-800 border-b-2 border-b-amber-800' : ''}`} onClick={() => handleClick(index)}>
                     <Link href={`/${item == "Home" ? "/" : item.toLowerCase().split(" ").join("-")}`}>
                         {item}
                     </Link>
                 </li>
             ))
           }
        </ul>

    </nav>
  )
}

export default Navbar
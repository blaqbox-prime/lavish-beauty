'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "@/components/Logo";
import {AlignRight, Menu} from "lucide-react";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

type Props = {
    activeTab: number,
    handleClick: (index: number) => void
}

type NavContainerProps = {}

const BREAKPOINT = 768

const navItems = ["Home", "Services", "Gallery" ,"About Us", "Contact"]

function Navbar({}: NavContainerProps) {

    const [activeTab, setActiveTab] = React.useState(0)
    const isMobile = window.innerWidth < BREAKPOINT

    const handleClick = (index: number) => {
        setActiveTab(index)
    }

  return (
    <div>
        {isMobile ? <ClientMobileNavbar activeTab={activeTab} handleClick={handleClick}/> : <ClientDesktopNavbar activeTab={activeTab} handleClick={handleClick}/>}
    </div>
  )
}

export default Navbar

const ClientDesktopNavbar = ({activeTab, handleClick} : Props) => {
    return (<nav className='flex flex-col items-center justify-center gap-2 py-4'>
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

    </nav>)
}

const ClientMobileNavbar = ({activeTab, handleClick}:Props) => {
    return (
        <div className="p-4 flex items-center justify-between">
            <Logo />
            <Sheet>
                <SheetTrigger>
                    <AlignRight />
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-6 mb-4 pr-4">
                    {
                        navItems.map((item, index) => (
                            <li key={index} className={`list-none border p-2 transition-all border-transparent hover:text-amber-800 ${activeTab === index? 'text-amber-800 border-b-2 border-b-amber-800' : ''}`} onClick={() => handleClick(index)}>
                                <Link href={`/${item == "Home" ? "/" : item.toLowerCase().split(" ").join("-")}`}>
                                    {item}
                                </Link>
                            </li>
                        ))
                    }
                </SheetContent>
            </Sheet>
        </div>
    );
}


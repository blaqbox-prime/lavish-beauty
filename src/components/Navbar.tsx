'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from "@/components/Logo"
import { AlignRight } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "usehooks-ts"

const BREAKPOINT = 768
const navItems = ["Home", "Services", "Gallery", "About Us", "Contact"]

function Navbar({className}: {className: String}) {
    const [activeTab, setActiveTab] = useState(0)
    const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT}px)`)

    useEffect(() => {
        console.log(activeTab)
    }, [activeTab])

    const handleClick = (index: number) => {
        setActiveTab(index)
    }

    const generateHref = (item: string) => {
        return item === "Home" ? "/" : `/${item.toLowerCase().split(" ").join("-")}`
    }

    const NavLink = ({ item, index, className = "" }: { item: string, index: number, className?: string }) => (
        <li 
            key={index} 
            className={`${className} border p-2 transition-all border-transparent hover:text-amber-800 ${
                activeTab === index ? 'text-amber-800 border-b-2 border-b-amber-800' : ''
            }`} 
            onClick={() => handleClick(index)}
        >
            <Link href={generateHref(item)}>
                {item}
            </Link>
        </li>
    )

    if (isMobile) {
        return (
            <div className={`p-4 flex items-center justify-between ${className}`}>
                <Logo className='text-white'/>
                <Sheet>
                    <SheetTrigger>
                        <AlignRight color='white'/>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col gap-6 mb-4 pr-4">
                        {navItems.map((item, index) => (
                            <NavLink 
                                key={index}
                                item={item} 
                                index={index} 
                                className="list-none" 
                            />
                        ))}
                    </SheetContent>
                </Sheet>
            </div>
        )
    }

    return (
        <nav className='flex flex-col items-center justify-center gap-2 py-4'>
            <Image 
                src="/logo-transparent-2.png"
                alt='logo'
                width={200}
                height={300}
            />
            <ul className='flex items-center gap-8'>
                {navItems.map((item, index) => (
                    <NavLink key={index} item={item} index={index} />
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
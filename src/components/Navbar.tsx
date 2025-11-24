'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from "@/components/Logo"
import { AlignRight } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "usehooks-ts"
import { usePathname } from 'next/navigation'

const BREAKPOINT = 768
const navItems = ["Gallery", "Contact"]

function Navbar({className}: {className: String}) {
    const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT}px)`)

    const path = usePathname();

    const generateHref = (item: string) => {
        return `/${item.toLowerCase().split(" ").join("-")}`
    }

    const NavLink = ({ item, index, className = "" }: { item: string, index: number, className?: string }) => (
        <li 
            key={index} 
            className={`${className} p-2 transition-all border-transparent hover:text-primary text-light hover:text-accent_light ${
                path.startsWith(`/${item.toLowerCase()}`) ? 'text-theme_primary' : ''
            }`} 
        >
            <Link href={generateHref(item)}>
                {item}
            </Link>
        </li>
    )

    if (isMobile) {
        return (
            <nav className={`p-4 flex items-center justify-between ${className}`}>
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
            </nav>
        )
    }

    return (
        <nav className={`flex items-center justify-between gap-2 py-4 w-full  ${className}`}>
            {/* <Image 
                src="/logo-transparent-2.png"
                alt='logo'
                width={200}
                height={300}
            /> */}
            <Logo className='text-white'/>
            <ul className='flex items-center gap-8'>
                {navItems.map((item, index) => (
                    <NavLink key={index} item={item} index={index} />
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
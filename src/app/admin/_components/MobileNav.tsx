"use client";

import Logo from "@/components/Logo";
import {
  AlignRight,
  BookOpenText,
  Home,
  Palette,
  Table,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IMobileNav {
  className?: string;
}

export default function MobileNav({ className = "" }: IMobileNav) {
  const path = usePathname();

  const icons = [
    {
      title: "Home",
      link: "/admin/dashboard",
      icon: (
        <Home
          className={`text-slate-400 hover:text-amber-500 transition-all duration-300 ${
            path.startsWith("/admin/dashboard") && "text-amber-700"
          } `}
          size={16}
        />
      ),
    },

    {
      title: "Bookings",
      link: "/admin/bookings",
      icon: (
        <BookOpenText
          className={`text-slate-400  hover:text-amber-500 transition-all duration-300 ${
            path.startsWith("/admin/bookings") && "text-amber-700"
          } `}
          size={16}
        />
      ),
    },

    {
      title: "Services",
      link: "/admin/services",
      icon: (
        <Palette
          className={`text-slate-400  hover:text-amber-500 transition-all duration-300 ${
            path.startsWith("/admin/services") && "text-amber-700"
          } `}
          size={16}
        />
      ),
    },

    {
      title: "Clients",
      link: "/admin/clients",
      icon: (
        <User
          className={`text-slate-400  hover:text-amber-500 transition-all duration-300 ${
            path.startsWith("/admin/clients") && "text-amber-700"
          } `}
          size={16}
        />
      ),
    },

    {
      title: "Invoices",
      link: "/admin/invoices",
      icon: (
        <Table
          className={`text-slate-400  hover:text-amber-500 transition-all duration-300 ${
            path.startsWith("/admin/invoices")  && "text-amber-700"
          } `}
          size={16}
        />
      ),
    },
  ];

  return (
    <nav className={`${className} p-4 flex items-center justify-between`}>
      <Logo />
      <Drawer>
        <DrawerTrigger>
          <AlignRight />
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-6 mb-4 pr-4">
          {icons.map((icon, idx) => (
            <Link
              href={icon.link}
              key={idx}
              className={`cursor-pointer text-slate-400 px-5 ${
                path.startsWith(icon.link) &&
                " border-r-2 border-amber-700 text-amber-700"
              } transition-all duration-200 flex items-center font-medium gap-4`}
            >
              {icon.icon}
              <p className={`${path.startsWith(icon.link) && "text-amber-700"}`}>{icon.title}</p>
            </Link>
          ))}
        </DrawerContent>
      </Drawer>
    </nav>
  );
}

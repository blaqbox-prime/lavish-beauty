"use client";
import React, { useState } from "react";
import { BookOpenText, Home, Palette, Table, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebar {
  className?: string;
}

function Sidebar({ className = "" }: ISidebar) {
  const [activeTab, setActiveTab] = useState(0);

  const path = usePathname();
  console.log(path)
   

  const icons = [
    {
      title: "Home",
      link: "/admin/dashboard",
      icon: (
        <Home
          className={` hover:text-amber-500 transition-all duration-300 ${
            path.startsWith("/admin/dashboard") ? "text-amber-700" : "text-slate-400"
          } `}
          size={16}
          // color={`${path.startsWith("/admin/dashboard") && "#b45309"}`}
        />
      ),
    },

    {
      title: "Bookings",
      link: "/admin/bookings",
      icon: (
        <BookOpenText
          className={`  hover:text-amber-500 transition-all duration-300 ${
            path.includes("/admin/bookings") ? "text-amber-700" : "text-slate-400"
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
          className={`  hover:text-amber-500 transition-all duration-300 ${
            path.includes("/admin/services") ? "text-amber-700" : "text-slate-400"
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
          className={`  hover:text-amber-500 transition-all duration-300 ${
            path.includes("/admin/clients") ? "text-amber-700" : "text-slate-400"
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
          className={` hover:text-amber-500 transition-all duration-300 ${
            path.includes("/admin/invoices") ? "text-amber-700" : "text-slate-400 "
          } `}
          size={16}
        />
      ),
    },
  ];

  return (
    <aside
      className={`${className} flex py-14 flex-col gap-10 min-h-screen border-r border-r-slate-100`}
    >
      {icons.map((icon:any, idx) => (
        <Link
          href={icon.link}
          onClick={() => {
            setActiveTab(idx);
          }}
          key={idx}
          className={`cursor-pointer px-5 ${
            path.includes(icon.link) && "text-amber-500 border-r-2 border-amber-500"
          } transition-all duration-200`}
        >
          {icon.icon}
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;

"use client";
import React, { useState } from "react";
import { BookOpenText, Home, Palette, Table, User } from "lucide-react";
import Link from "next/link";

interface ISidebar {
  className?: string;
}

function Sidebar({ className = "" }: ISidebar) {
  const [activeTab, setActiveTab] = useState(0);

  const icons = [
    {
      title: "Home",
      link: "/admin/dashboard",
      icon: (
        <Home
          className={`text-slate-400 hover:text-slate-500 transition-all duration-300 ${
            0 == activeTab && "text-pink-700"
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
          className={`text-slate-400  hover:text-slate-500 transition-all duration-300 ${
            1 == activeTab && "text-pink-700"
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
          className={`text-slate-400  hover:text-slate-500 transition-all duration-300 ${
            2 == activeTab && "text-pink-700"
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
          className={`text-slate-400  hover:text-slate-500 transition-all duration-300 ${
            3 == activeTab && "text-pink-700"
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
          className={`text-slate-400  hover:text-slate-500 transition-all duration-300 ${
            4 == activeTab && "text-pink-700"
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
      {icons.map((icon, idx) => (
        <Link
          href={icon.link}
          onClick={() => {
            setActiveTab(idx);
          }}
          key={idx}
          className={`cursor-pointer px-5 ${
            idx == activeTab && "text-slate-500 border-r-2 border-pink-500"
          } transition-all duration-200`}
        >
          {icon.icon}
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;

import React, { useState } from "react";
import Sidebar from '@/app/admin/_components/Sidebar'
import MobileNav from "./_components/MobileNav";
import { usePathname } from "next/navigation";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="flex md:flex-row flex-col">
      {/* Side bar */}
      <Sidebar className="md:flex hidden" />
      {/* mobile nav */}
      <MobileNav className="md:hidden flex" />

      {/* page content */}
      <main className="flex-1 md:p-14 p-8 overflow-hidden">
            {children}
      </main>
    </div>
  );
}

export default layout;

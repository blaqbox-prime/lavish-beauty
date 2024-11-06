import React, { useState } from "react";
import Sidebar from '@/app/admin/_components/Sidebar'
import MobileNav from "./_components/MobileNav";

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
      <main className="flex-1 md:p-14 p-8">
            {children}
      </main>
    </div>
  );
}

export default layout;

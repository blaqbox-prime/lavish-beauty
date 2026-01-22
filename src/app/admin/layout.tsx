import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { images } from "@/constants";
import Image from "next/image";

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
      <main className="flex-1 md:p-14 p-4 overflow-hidden relative">
            {children}
            <Image src={images.makeupBanner} alt="" className="absolute opacity-5 top-[50%] translate-y-[-50%] scale-150 -z-10 right-0 origin-center rotate-90 "/>
      </main>
    </div>
  );
}

export default layout;

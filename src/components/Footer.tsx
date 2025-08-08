"use client";

import Image from "next/image";
import Logo from "./Logo";
import {motion} from "framer-motion";
import { icons, images } from "@/constants";

function Footer() {
    return (
        <footer className="p-6 border-t border-amber-100 bg-white text-gray-600 max-w-screen-xl mx-auto">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3 flex flex-col gap-4">
                        <Logo />
                        <p className="text-sm text-gray-500 max-w-[500px] text-balance">Lavish Beauty is a bridal make-up service based in Limpopo, South Africa. We specialize in soft glam and bridal make-up.</p>
                        <p className="text-sm text-gray-500">© 2023 Lavish Beauty. All rights reserved.</p>
                    </div>

                    <div className="col-span-1 flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-amber-800">Contact Us</h3>
                        <p className="text-sm text-gray-400">Email: evelynmaremane@gmail.com</p>
                        <p className="text-sm text-gray-400">Phone: +27 63 123 4567</p> 
                        <address>
                            <p className="text-sm text-gray-400">Address: Modimolle, Limpopo, South Africa</p>
                        </address>
                    </div>

                    <div className="col-span-1 flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-amber-800">Follow Us</h3>
                        <p className="text-sm text-gray-400">Yes, we are social</p>
                        <div className="flex items-center gap-4">
                            <a href="instagram.com/lavishbeauty" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                <Image src={icons.instagram} alt="instagram" width={25} height={25} className="size-6" />
                            </a>
                            <a href="facebook.com/lavishbeauty" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                <Image src={icons.facebook} alt="facebook" width={25} height={25} className="size-6" />
                            </a>
                            <a href="tiktok.com/lavishbeauty" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                <Image src={icons.tiktok} alt="tiktok" width={25} height={25} className="size-6" />
                            </a>
                        </div>                    
                    </div>
                </div>
        </footer>
    );
}

export default Footer;
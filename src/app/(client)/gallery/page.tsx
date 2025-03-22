import React from 'react'
import StorageService from "@/services/StorageService";
import GalleryLayout from "@/app/(client)/gallery/GalleryLayout";

type Props = {}

async function GalleryPage({}: Props) {
    const storageService = new StorageService()
    const images = await storageService.getGalleryImages()

  return (
      <main className="mx-8 text-center ">
        <h1 className={`text-4xl text-center w-full text-amber-800 my-8
            after:block after:h-[2px] after:w-[100px] after:origin-center after:bg-amber-800 after:bottom-0 after:mx-auto
            after:animate-pulse animate-infinite`}>Portfolio of Looks</h1>
        <p className={"mx-auto text-lg text-center max-w-[500px] mb-8 "}>From glam makeovers to natural beauty touches
            get ready for flawless, unforgettable looks tailored to your style.</p>

        <GalleryLayout images={images}  />

    </main>
  )
}

export default GalleryPage
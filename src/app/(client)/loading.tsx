"use client"
import React from 'react'
import { Rings } from 'react-loader-spinner'
import IntroSlide from "@/components/IntroSlide";

type Props = {
  title: string,
  subtitle: string
}

function loading({title, subtitle}: Props) {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-4'>

    </div>
  )
}

export default loading
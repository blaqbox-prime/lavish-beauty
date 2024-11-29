import Image from 'next/image'
import React from 'react'

interface ILogo {
    className?: string,
    width?: number,
    height?: number,
}

export default function Logo({className = '', width, height}: ILogo) {
  return (
    <Image alt='logo' src='/logo-transparent-2.png' className={`${className}`} width={ width ?? 120} height={height ?? 35}/>
  )
}
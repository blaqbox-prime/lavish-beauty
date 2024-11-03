"use client"
import React from 'react'
import { Rings } from 'react-loader-spinner'

type Props = {}

function loading({}: Props) {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-4'>
        <Rings
  visible={true}
  height="150"
  width="150"
  color="#d97706"
  ariaLabel="rings-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

    <h1 className='text-6xl text-amber-950'>Loading</h1>

    </div>
  )
}

export default loading
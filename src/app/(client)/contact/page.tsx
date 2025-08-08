import { images } from '@/constants'
import Image from 'next/image'
import React from 'react'

type Props = {}

function ContactPage({}: Props) {
  return (
    <div className='min-h-screen grid grid-cols-2 gap-16 p-2'>
      <div className="left"></div>
      <div className="right overflow-hidden relative">
        <Image src={images.womenBg} alt='women' className=' transition-all duration-1000 hover:scale-110'/>
        <div className="message z-40 absolute max-w-48 bottom-8 left-8 text-white">
          <q className='font-bold text-lg'>
          "Every brushstroke, every blend, every moment spent enhancing beauty is a privilege. Thank you for trusting me with your radiance—your support means the world!"
        </q>
        <div className="flex items-center gap-4">
            <Image src={images.avatar} alt='avatar' className='h-9 w-9 rounded-full'/>
            <div className="space-y-4">
              <h3 className='bold'>Evelyn Maremane</h3>
              <p className='font-light'>Makeup Artist</p>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
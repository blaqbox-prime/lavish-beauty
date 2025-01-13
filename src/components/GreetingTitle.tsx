import { greeting } from '@/lib/utils'
import React from 'react'

type Props = {
    username: string
    className?: string 
}

function GreetingTitle({username, className = ''}: Props) {
  return (
    <h1 className={className}>{greeting()} <span className='text-amber-900'>{username}</span></h1>
  )
}

export default GreetingTitle
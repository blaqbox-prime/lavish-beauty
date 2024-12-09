import React from 'react'
import { Rings } from 'react-loader-spinner'

function LoadingAnimation({size = 48, className = ''}: {size: number | string, className?:string}) {
  return (
    <div className={`${className}`}>
      <Rings
  visible={true}
  height={size}
  width={size}
  color="#d97706"
  ariaLabel="rings-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}

export default LoadingAnimation
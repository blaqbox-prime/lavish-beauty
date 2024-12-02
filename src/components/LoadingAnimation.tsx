import React from 'react'
import { Rings } from 'react-loader-spinner'

function LoadingAnimation({size}: {size: number | string}) {
  return (
    <Rings
  visible={true}
  height={size}
  width={size}
  color="#d97706"
  ariaLabel="rings-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  )
}

export default LoadingAnimation
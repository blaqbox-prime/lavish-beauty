import React from 'react'

type Props = {text: string, type?: 'button' | 'submit' | 'reset', className?: string, onclick?: () => void}

function CustomButton({text, type, className, onclick}: Props) {
  return (
    <button type={type} className={`btn btn-secondary ${className}`} onClick={() => { onclick && onclick() }} >
            <span className="text text-1">{text}</span>
            <span className="text text-2" aria-hidden="true">{text}</span>
    </button>

  )
}

export default CustomButton

import React from 'react'

function ActionCard({ title = 'Action', icon, onClick }: { title?: string; icon?: any; onClick?: () => void }) {
  return (
    <div className="flex items-center gap-4 font-semibold text-white bg-amber-900 hover:bg-amber-800 rounded-lg p-4 text-ellipsis" onClick={onClick}>
    {icon && icon}
    <h4>{title}</h4>
    </div>
  )
}

export default ActionCard
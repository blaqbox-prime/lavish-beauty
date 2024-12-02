import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React, { memo } from 'react'

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

function Search({ onChange, value = '' }: Props) {
  return (
    <Input
      type="search"
      placeholder="Search client name"
      className="col-span-4 md:flex-1 w-full"
      onChange={onChange}
      value={value}
      icon={<SearchIcon className="text-gray-500" size={16} />}
    />
  )
}

export default memo(Search)
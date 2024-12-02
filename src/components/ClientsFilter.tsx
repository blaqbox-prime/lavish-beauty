"use client"
import React from 'react'
import * as motion from "framer-motion/client";
import Search from './Search';

type Props = {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  searchText: string,
}

function ClientsFilter({handleSearch, searchText}: Props) {

  return (
    <section
          title="filters"
          className="md:flex items-center gap-4 w-full mb-2 "
        >

          {/* Search box */}
          <motion.div
            className="grid grid-cols-4 gap-4 opacity-0 md:flex md:flex-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Search onChange={handleSearch} value={searchText}/>
            
          </motion.div>
        </section>
  )
}

export default ClientsFilter
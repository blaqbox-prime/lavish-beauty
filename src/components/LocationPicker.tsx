"use client"

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export type Location = "Lephalale" | "Nylstroom" | "House Call" | "Other"

type Props = {
  location?: Location,
  onChange: (location: Location) => void,
  className?: string
}

export const AVAILABLE_LOCATIONS : Location[] = [
  'House Call',
  'Lephalale',
  'Nylstroom',
  'Other',
]

function LocationPicker({location = 'Lephalale', onChange, className}: Props) {
  return (
    <Select onValueChange={(value: Location) => {onChange(value)}}>
  <SelectTrigger className={`${className}`}>
    <SelectValue placeholder="Where is the appointment?" defaultValue={location ?? undefined} />
  </SelectTrigger>
  <SelectContent>
    {AVAILABLE_LOCATIONS.map((location: Location) => <SelectItem key={location} value={location}>{location}</SelectItem>)}
  </SelectContent>
</Select>
  )
}

export default LocationPicker
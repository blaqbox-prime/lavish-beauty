"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useBookings } from "@/zustand/store"

interface IDateRangePicker extends React.HTMLAttributes<HTMLDivElement>{
    fromDate?: Date,
    toDate?: Date
}

export default function DateRangePicker({className, fromDate, toDate}: IDateRangePicker) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: fromDate || new Date(),
        to: toDate || addDays(new Date(), 30),
      })

      const setStartDate = useBookings((state: any) => state.setStartDate)
      const setEndDate = useBookings((state: any) => state.setEndDate)
    
      return (
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a start and end date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(new_selected) => {
                    console.log(new_selected)
                    setDate(new_selected)
                    setStartDate(new_selected?.from)
                    setEndDate(new_selected?.to)
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      )
}



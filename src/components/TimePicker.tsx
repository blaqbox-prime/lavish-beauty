import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimeSlot } from "@/types";
import { isAllowedTime } from "@/lib/utils";
import { format } from "@formkit/tempo";
import { addDays, isSameDay } from "date-fns";

type Props = {
    onChange: (value: string) => void,
    times?: string[],
    selectedDate?: Date
};

const DEFAULT_TiMES: TimeSlot[] = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

function TimePicker({times, onChange, selectedDate = addDays(new Date(), 1)}: Props) {

    const slots = times ? times : DEFAULT_TiMES;

    useEffect(() => {}, [selectedDate])

  return (
    <Select onValueChange={(value: string) => {onChange(value)}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a time slot" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Slots</SelectLabel>
          {
            slots.map((slot: string) => {
              const today = new Date()
              const now = format(new Date(),{time: "short"},'de') as TimeSlot 
              
              if(isSameDay(today, selectedDate)){
                return isAllowedTime(slot as TimeSlot, now ) && (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                )
              } else {
                return (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                )
              }

            } )
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default TimePicker;

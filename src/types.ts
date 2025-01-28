import { Database, Tables } from "./database/database";

export interface BookingRecord extends Tables<"bookings"> {
  customer?: any;
}

export interface CustomerRecord extends Tables<"customer"> {}

export interface ServiceRecord extends Tables<"services"> {}

export interface ClientRecord extends Tables<"customer"> {}

export type TimeSlot =
  | "09:00"
  | "10:00"
  | "11:00"
  | "12:00"
  | "13:00"
  | "14:00"
  | "15:00"
  | "16:00"
  | "17:00"
  | "18:00"
  | "19:00";

  export type Status = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'missed'

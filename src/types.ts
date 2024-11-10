import { Database, Tables } from "./database/database"

export type BookingRecord = {
    id: number,
     customer_id: number,
     booking_date: Date,
     status: "Confirmed" | "Pending" | "Cancelled",
     created_at: Date, 
     customer?: CustomerRecord
 }
 
 export type CustomerRecord = {
       id: number,
       name: string,
       email: string,
       phone: string,
       created_at: Date
 }

 export interface ServiceRecord extends Tables<'services'> {
     
 }
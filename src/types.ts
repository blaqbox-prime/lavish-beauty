import { Database, Tables } from "./database/database"

export interface BookingRecord extends Tables<'bookings'> {
  customer?: any;
  
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

 export interface ClientRecord extends Tables<'customer'> {
      
 }
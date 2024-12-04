import { Database, Tables } from "./database/database"

export interface BookingRecord extends Tables<'bookings'> {
  customer?: any;
 }
 
 export interface CustomerRecord extends Tables<'customer'> {

 }

 export interface ServiceRecord extends Tables<'services'> {
     
 }

 export interface ClientRecord extends Tables<'customer'> {
      
 }
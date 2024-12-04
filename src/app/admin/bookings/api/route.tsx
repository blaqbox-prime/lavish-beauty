import { NextRequest, NextResponse } from "next/server";
import supabase from '@/database/supabase'
import _ from "lodash";

export const dynamic = 'force-static'
export const revalidate = 60 * 60 //revalidate every hour

export async function GET(request: NextRequest){
  

  const { data, error } = await supabase
  .from('bookings')
  .select(`*, customer(*) , services:booked_service(services(*))`)
  .order('booking_date',{ascending: false})


  if(error){
    return NextResponse.json({"message": error.message})
  }

  const formatted = data.map((item: any) => ({
    ...item,
    services: _.map(item.services,(bookedService: any) => bookedService.services),
  }));

  console.log(data)
  return NextResponse.json(formatted)

}
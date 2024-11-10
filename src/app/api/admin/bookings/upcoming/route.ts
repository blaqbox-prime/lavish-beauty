import { NextRequest, NextResponse } from "next/server";
import supabase from '@/database/supabase'

export const dynamic = 'force-static'
export const revalidate = 60 * 30 //revalidate every hour

export async function GET(request: NextRequest){

  

  const { data, error } = await supabase
  .from('bookings')
  .select('*, customer(*)')
  .gte('booking_date', new Date().toISOString())
  .order('booking_date',{ascending: true})

  if(error){
    return NextResponse.json({"message": error.message})
  }

  return NextResponse.json(data)

}
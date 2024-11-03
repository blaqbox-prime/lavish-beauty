import { NextRequest, NextResponse } from "next/server";
import supabase from '@/lib/supabase'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 //revalidate every hour

export async function GET(request: NextRequest){
    const { data, error } = await supabase
  .from('bookings')
  .select('*, customer(*)')
  .order('booking_date',{ascending:false})

  if(error){
    return NextResponse.json({"message": error.message})
  }

  return NextResponse.json(data)

}
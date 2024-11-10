import { NextRequest, NextResponse } from "next/server";
import supabase from '@/database/supabase'

// export const dynamic = 'force-static'
// export const revalidate = 60 * 60 //revalidate every hour

export async function GET(request: NextRequest){

  // const page = Number(request.nextUrl.searchParams.get('page')) || 1;
  // const limit = Number(request.nextUrl.searchParams.get('limit')) || 10;
  const id = request.nextUrl.searchParams.get('id');
  

  const { data, error } = await supabase
  .from('services')
  .select('*')
  if(error){
    return NextResponse.json({"message": error.message})
  }

  return NextResponse.json(data)

}
import { NextRequest, NextResponse } from "next/server";
import supabase from '@/database/supabase'
import { getTotalRevenue } from "@/services/InvoiceService";


export async function GET(request: NextRequest){

    const data = await getTotalRevenue()

  return NextResponse.json(data)

}
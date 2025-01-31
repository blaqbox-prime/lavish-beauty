import { TablesUpdate } from "@/database/database";
import supabase from "@/database/supabase";
import { ClientRecord } from "@/types";

export const getTotalRevenue = async () : Promise<number> => {
    const { data, error } = await supabase
    .rpc('get_total_invoice_amount');
  
  if (error) {
    console.error('Error fetching total amount:', error);
    return  0.0
  } else {
    console.log('Total Amount:', data);
    return data
  }
};

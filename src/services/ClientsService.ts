import { TablesUpdate } from "@/database/database";
import supabase from "@/database/supabase";
import { ClientRecord } from "@/types";

export const deleteClient = async (id: string | number) => {
  const { error } = await supabase.from("customer").delete().eq("id", id);

  if (error) {
    console.log(error);
    return false;
  }
  return true;
};

export const fetchAllClients = async () => {
  const { data, error } = await supabase.from("customer").select("*");

  if (error) {
    console.log(error);
    return [];
  }
  return data;
};

export const updateClient = async (client: any) => {
  const { error } = await supabase
    .from("customer")
    .update(client)
    .eq("id", client.id);

  if (error) {
    console.log(error);
    return false;
  }
  return true;
};

export const fetchClientById = async (id: string | number) => {
  const { data, error } = await supabase
  .from("customer")
  .select("*")
  .eq('id', id)
  .single();

  if(error) {
    console.error(error)
    return null
  }

  return data as ClientRecord;
};

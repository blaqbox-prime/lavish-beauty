"use client";

import { useClientsView } from "@/hooks/useClients";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import ClientsFilter from "./ClientsFilter";
import ClientsTable from "./ClientsTable";
import BookingViewSkeleton from "./BookingViewSkeleton";
import CardListOfClients from "./CardListOfClients";

type Props = {};

function ClientsView({}: Props) {
  // Use the useClientsView hook to get the filtered clients
  const { filteredClients, clients, loading, handleSearch, searchText, } = useClientsView();
  console.log(filteredClients);

  if (clients.length == 0 && loading == false) {
    return (
      <div className="w-full text-center py-4 flex flex-col items-center gap-4">
        <Image
          src="/assets/images/undraw_booked.svg"
          width="200"
          height={200}
          alt="bookings"
          className="aspect-auto"
        />
        <h1 className="text-xl font-bold text-amber-950">
          No data yet. Get Started.
        </h1>
        <Button className="bg-amber-950 hover:bg-amber-900">
          {" "}
          <Plus className="text-amber-100" /> New Client
        </Button>
      </div>
    );
  }

  // loading state
  if (loading == true) {
    return <BookingViewSkeleton />;
  } else
    return (
      <section>
        <ClientsFilter handleSearch={handleSearch} searchText={searchText} />
        <ClientsTable clientsList={filteredClients}/>
        <CardListOfClients clients={filteredClients}/>
      </section>
    );
}

export default ClientsView;

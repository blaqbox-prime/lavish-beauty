"use client";
import { ClientRecord } from "@/types";

import _ from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, {useMemo, useState} from "react";
import { ArrowLeft, ArrowRight, DeleteIcon, Edit2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import ClientService from "@/services/ClientsService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useClients } from "@/zustand/store";

type ClientsTable = {
  clientsList: ClientRecord[];
};

function ClientsTable({ clientsList = [] }: ClientsTable) {
  
  const clientService = useMemo(() => new ClientService(), []);
  const NUM_PAGES = clientsList.length / 10;
  const page = useClients((state: any) => state.page)
  const start = useClients((state: any) => state.start)
  const setPage = useClients((state: any) => state.setPage)
  const setStart = useClients((state: any) => state.setStart)
  const router = useRouter();
  const getClients = useClients((state: any) => state.getClients);

  const handleDelete = async (client: ClientRecord) => {
    // Implement your own logic for deleting a client
    console.log("Delete client with ID:", client.id);
    const deleted = await clientService.deleteClient(client.id);

    if (deleted) {

      'use server'
      await getClients();

      // Update the clients list without the deleted client
            toast({
        title: "Client deleted successfully",
        description: `${client.name} has been deleted successfully`,
      });
    }

    else {
        toast({
            title: "Failed to delete client",
            description: `Please try again later.`,
          });
    }

  };

  return (
    <section className="w-full hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {_.slice(clientsList, start, page * 10).map((client: ClientRecord) => (
            <TableRow className="cursor-pointer" key={client.id}>
              <TableCell>{client?.id}</TableCell>
              <TableCell>{_.capitalize(client.name)}</TableCell>
              <TableCell>
                {client.email || "No email address available"}
              </TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell className="font-bold text-amber-950">
                <Edit2Icon
                size={18}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/admin/clients/${client.id}`);
                  }}
                />
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger className="">
                    <DeleteIcon
                    size={18}
                      className="text-red-600"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete {client.name}?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <button
                        className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-md text-sm"
                        onClick={() => handleDelete(client)}
                      >
                        Confirm Delete
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex p-2 gap-4 items-center justify-center w-full ">
        <ArrowLeft
          className={`cursor-pointer ${
            page <= 1 && "cursor-default pointer-events-none opacity-0"
          }`}
          onClick={() => {
            if (page > 1) {
              setStart(start - 10);
              setPage(page - 1);
            }
          }}
        />
        <p>{page}</p>
        <ArrowRight
          className={`cursor-pointer ${
            page >= NUM_PAGES && "cursor-default pointer-events-none opacity-0"
          }`}
          onClick={() => {
            if (page < NUM_PAGES) {
              setStart(start + 10);
              setPage(page + 1);
            }
          }}
        />
      </div>
    </section>
  );
}

export default ClientsTable;

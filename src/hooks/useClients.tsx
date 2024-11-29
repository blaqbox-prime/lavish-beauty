
import { useState, useEffect, useMemo } from 'react';
import { useClients } from '@/zustand/store';
import { BookingRecord, ClientRecord } from '@/types';
import _ from 'lodash';

export const useClientsView = () => {
  const loading = useClients((state: any) => state.loading);
  const getClients = useClients((state: any) => state.getClients);
  const clients = useClients((state: any) => state.clients);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getClients();
  }, [getClients]);

  const filteredClients = searchText.length > 0 ? _.filter(clients, (client: ClientRecord) => client.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) as ClientRecord[] : clients


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    console.log(e.target.value);
  };

  return {
    loading,
    clients,
    filteredClients,
    searchText,
    handleSearch
  };
};


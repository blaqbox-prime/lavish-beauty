import React, { useEffect, useMemo, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { FormControl } from './ui/form'
import { getAllServices } from '@/services/ServicesService'
import { ServiceRecord } from '@/types'
import supabase from '@/database/supabase'


type Props = {
    onChange: (value: any) => void,
    field: any
}

function ServicesPicker({onChange, field}: Props) {

    const [categories, setCategories] = useState<any | null>([]);
    const [selected, setSelected] = useState<number[]>([])
    const [loading, setLoading] = useState(false)
    const [servicesOptions, setServices] = useState<ServiceRecord[]>([]);

    let selectedCount = useMemo(() => selected.reduce(
        (total: number) =>
          total + 1,
        0
      ), [selected])

    useEffect(() => {
      // fetch services
    const fetchServicesOptions = async () => {
        const services = await getAllServices();
        if (services != null) {
          setServices(services);
        }
      };

      const fetchCategoriesOptions = async () => {
        const { data, error } = await supabase.from("categories").select("*");
  
        if (data) {
          setCategories(data);
        }
      };
    
      setLoading(true)
      fetchServicesOptions()
      fetchCategoriesOptions();
      setLoading(false)
    }, [])
    

  return (
    <Select
                onValueChange={(value) => {
                  // if not selected, then add its ID
                  if (!selected.includes(Number(value))) {
                    const newList = [...selected, Number(value)]
                    setSelected(newList);
                    // 
                    onChange(newList);
                    console.log(newList);
                    return;
                  } else {
                    const newList = selected.filter(
                        (id: number) => id != Number(value)
                      ) 
                    setSelected(newList);

                    // setSelectedServices(selectedServices - 1);
                    onChange(newList);
                    console.log(newList);
                    return;
                  }
                  
                }}
                // defaultValue={field.value as unknown as string}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select One or More Services">
                      <h1>{`${selectedCount} services selected`}</h1>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category: any) => (
                    <SelectGroup key={category.id}>
                      <SelectLabel>{category.name}</SelectLabel>
                      {servicesOptions?.map((service: ServiceRecord) => {
                        if (service.category == category.name) {
                          return (
                            <SelectItem
                              key={service.id}
                              value={`${service.id}`}
                              className={`${
                                field.value.includes(service.id) &&
                                "bg-amber-300 text-amber-950"
                              }`}
                            >
                              {service.service_name}
                            </SelectItem>
                          );
                        }
                      })}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
  )
}

export default ServicesPicker
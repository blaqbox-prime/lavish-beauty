import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import * as motion from "framer-motion/client";
import Link from "next/link";
import ServiceCard from "./ServiceCard";
import ServicesService from "@/services/ServicesService";
import { Plus } from "lucide-react";

type Props = {};

async function ServicesSummary({}: Props) {
  const servicesService = new ServicesService();

  // Fetch top 5 services
  const services = await servicesService.getTop5Services();

  if (!services || services.length === 0) {
    console.error("No services found or an error occurred.");
    return (
      <Card className="overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <h2>Top 5 Services</h2>
            <Link href="/admin/services/new" className="bg-amber-600 text-white p-1 rounded-full">
              <Plus />
            </Link>
          </CardTitle>
          <CardDescription>Manage your services</CardDescription>
        </CardHeader>
        <CardContent>
          <p>No services available at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <h2>Top 5 Services</h2>
          <Link href="/admin/services/new" className="bg-amber-600 text-white p-1 rounded-full">
            <Plus />
          </Link>
        </CardTitle>
        <CardDescription>Manage your services</CardDescription>
      </CardHeader>

      <CardContent>
        <motion.section title="services available">
          <motion.section
            className="grid grid-cols-2 gap-4 mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
          >
            {services.map((service) => {
              if (!service.id) {
                console.error("Service ID is missing:", service);
                return null;
              }
              return (
                <Link href={`/admin/services/${service.id}`} key={service.id}>
                  <ServiceCard service={service} />
                </Link>
              );
            })}
          </motion.section>
        </motion.section>
      </CardContent>
    </Card>
  );
}

export default ServicesSummary;
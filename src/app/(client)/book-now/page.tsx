import SectionHeading from "@/components/ui/SectionHeading";
import ClientSideBookingForm from "@/components/ClientSideBookingForm";


export default function BookNowPage() {
  return (
    <main className="bg-light flex flex-col min-h-screen max-w-4xl mx-auto justify-center gap-4 pt-4">
      <SectionHeading title={"Book Your Session Today!"} />
        <div className="w-full px-4 mx-auto mb-8">
            <ClientSideBookingForm className="p-4 md:p-12" />
        </div>
    </main>
  )
}
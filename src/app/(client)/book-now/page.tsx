import SectionHeading from "@/components/ui/SectionHeading";
import ClientSideBookingForm from "@/components/ClientSideBookingForm";


export default function BookNowPage() {
  return (
    <main className="flex flex-col min-h-screen max-w-4xl mx-auto justify-center gap-4 pt-4">
      <SectionHeading title={"Book Your Session Today!"} />
        <div className="bg-white w-full max-w-screen-md mx-auto mb-8">
            <ClientSideBookingForm className=" border-amber-100 border p-4 md:p-12 rounded-md shadow-lg mx-8" />
        </div>
    </main>
  )
}
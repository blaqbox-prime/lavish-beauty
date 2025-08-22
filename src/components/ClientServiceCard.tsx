import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ClientServiceCardProps {
  number: string;
  title: string;
  imageSrc: string;
}

const ClientServiceCard: React.FC<ClientServiceCardProps> = ({ number, title, imageSrc }) => {
  return (
    <div className="basis-full md:basis-1/4 m-4 flex flex-col gap-4 relative">
      <div className="absolute z-30 left-8 -top-20 flex items-baseline">
        <p className="text-9xl font-playfair font-thin text-accent_light/70">{number}</p>
      </div>
        <p className="text-xl font-bold text-accent_light/20 absolute z-30 origin-bottom-right bottom-[95%] right-6 -rotate-90">{title}</p>
      
      <Link href="/book-now">
        <div className="absolute z-30 bottom-4 right-4 bg-accent_light/20 backdrop-blur-md p-2 rounded-full text-dark hover:bg-accent_light/80 transition-colors">
            <CalendarDays />
        </div>
      </Link>
      <Image
        src={imageSrc}
        width={500}
        height={500}
        alt=""
        className="object-cover object-center rounded-2xl brightness-75 transition-all hover:brightness-90 duration-500"
      />
    </div>
  );
};

export default ClientServiceCard;
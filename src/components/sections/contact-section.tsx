import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import { physicianData } from '@/data/physician';
// import { headingData } from '@/data/heading';

interface Props {
  title?: string;
}

export default function ContactSection({ title }: Props) {
  return (
    <section id="contact" className="scroll-mt-28 bg-white px-6 py-12
    ">
      <div className="mx-auto max-w-5xl">
        <Card className="rounded-3xl p-10 shadow-xl">
          <h2 className="mb-10 text-3xl font-bold">{title}</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <Phone className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Phone</h3>
              <p>{physicianData.phone}</p>
            </div>
            <div className="space-y-3">
              <Mail className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Email</h3>
              <p>{physicianData.email}</p>
            </div>

            <div className="space-y-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Address</h3>
              <p>{physicianData.address}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

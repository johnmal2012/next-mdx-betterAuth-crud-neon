import Image from 'next/image';

import { physicianData } from '@/data/physician';

import { db } from '@/db/db';

import { physicianSections } from '@/db/schema/physician-sections';

import PhysicianSection from '@/components/physician-section';

export default async function PhysicianPage() {
  const sections = await db.select().from(physicianSections);

  return (
    <main className="space-y-16">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-widest">
            {physicianData.specialty}
          </p>

          <h1 className="text-6xl font-bold leading-tight">
            {physicianData.name}
          </h1>

          <p className="text-2xl text-zinc-600">{physicianData.title}</p>

          <div className="space-y-2">
            <p>{physicianData.clinicName}</p>

            <p>{physicianData.phone}</p>

            <p>{physicianData.email}</p>
          </div>
        </div>

        <div>
          <Image
            src={physicianData.image}
            alt={physicianData.name}
            width={600}
            height={700}
            className="rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="space-y-16">
        {sections.map((section) => (
          <PhysicianSection
            key={section.id}
            title={section.title}
            content={section.content}
          />
        ))}
      </section>
    </main>
  );
}

import Link from 'next/link';

import { db } from '@/db/db';

import { physicianSections } from '@/db/schema/physician-sections';

import { asc } from 'drizzle-orm';

import { SectionDeleteButton } from '@/components/admin/section/section-delete-button';
import { ReturnButton } from '@/components/return-button';
import { Button } from '@/components/ui/button';

// import AdminSectionOrderList
// from '@/components/admin-section-order-list';

export default async function AdminSectionPage() {
//   const sections = await db
//     .select()
//     .from(physicianSections)
//     .orderBy(asc(physicianSections.displayOrder));
  const sections = await db
    .query.physicianSections.findMany({orderBy: asc(physicianSections.id)})

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10 space-y-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4">
            {/* Left Side */}
            <div>
              <h1 className="text-4xl font-bold">Manage Sections</h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Button className="h-10 px-4" asChild>
                <Link href="/admin/sections/create">Create Section</Link>
              </Button>

              <ReturnButton href="/" label="Home" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.id}
                className="rounded-2xl border bg-background p-5 transition hover:shadow-md"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">{section.title}</h2>

                  <p className="text-sm text-muted-foreground">
                    Slug: {section.slug}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Display Order: {section.displayOrder}
                  </p>
                </div>

                <div className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                  <Button
                    className="h-10 w-24 bg-green-600! hover:bg-green-700!"
                    size="lg"
                    asChild
                  >
                    <Link href={`/admin/sections/${section.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                  <SectionDeleteButton id={section.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

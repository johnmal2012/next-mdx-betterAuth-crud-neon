'use client';

import { useState } from 'react';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Button }
from '@/components/ui/button';

import { Input }
from '@/components/ui/input';

type Section = {
  id: number;

  title: string;

  slug: string;

  displayOrder: number;
};

type Props = {
  sections: Section[];
};

export default function AdminSectionOrderList({
  sections,
}: Props) {
  const [items, setItems] =
    useState(sections);

  async function saveOrder(
    id: number,
    displayOrder: number
  ) {
    await fetch(
      `/api/sections/${id}`,
      {
        method: 'PATCH',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          displayOrder,
        }),
      }
    );
  }

  return (
    <div className="space-y-6">
      {items.map((section) => (
        <Card
          key={section.id}
          className="shadow-sm"
        >
          <CardContent
            className="
              p-6
              flex
              flex-col
              md:flex-row
              gap-6
              md:items-center
              md:justify-between
            "
          >
            <div className="space-y-1">
              <h2
                className="
                  text-xl
                  font-semibold
                "
              >
                {section.title}
              </h2>

              <p
                className="
                  text-sm
                  text-zinc-500
                "
              >
                {section.slug}
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <Input
                type="number"
                value={
                  section.displayOrder
                }
                onChange={(e) => {
                  const value =
                    Number(
                      e.target.value
                    );

                  setItems((prev) =>
                    prev.map((item) =>
                      item.id ===
                      section.id
                        ? {
                            ...item,
                            displayOrder:
                              value,
                          }
                        : item
                    )
                  );
                }}
                className="w-24"
              />

              <Button
                onClick={() =>
                  saveOrder(
                    section.id,
                    section.displayOrder
                  )
                }
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
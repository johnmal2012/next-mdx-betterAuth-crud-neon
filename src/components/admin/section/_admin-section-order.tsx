'use client';

import { useState } from 'react';

type Props = {
  section: {
    id: number;
    title: string;
    displayOrder: number;
  };
};

export default function AdminSectionOrder({
  section,
}: Props) {
  const [value, setValue] =
    useState(
      section.displayOrder
    );

  async function updateOrder() {
    await fetch(
      `/api/sections/${section.id}`,
      {
        method: 'PATCH',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          displayOrder: value,
        }),
      }
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-4
      "
    >
      <p>{section.title}</p>

      <input
        type="number"
        title='displayOrder'
        value={value}
        onChange={(e) =>
          setValue(
            Number(
              e.target.value
            )
          )
        }
        className="
          border
          p-2
          w-24
        "
      />

      <button
        onClick={updateOrder}
        className="
          bg-black
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        Save
      </button>
    </div>
  );
}
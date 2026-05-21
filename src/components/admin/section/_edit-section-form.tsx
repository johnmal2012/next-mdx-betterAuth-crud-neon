'use client';

import {
  useState,
} from 'react';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Input }
from '@/components/ui/input';

import { Button }
from '@/components/ui/button';

import { Textarea }
from '@/components/ui/textarea';

type Props = {
  section: {
    id: number;

    title: string;

    slug: string;

    content: string;

    displayOrder: number;
  };
};

export default function EditSectionForm({
  section,
}: Props) {
  const [title, setTitle] =
    useState(section.title);

  const [content, setContent] =
    useState(section.content);

  const [
    displayOrder,
    setDisplayOrder,
  ] = useState(
    section.displayOrder
  );

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.SubmitEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    await fetch(
      `/api/sections/${section.id}`,
      {
        method: 'PATCH',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          title,
          content,
          displayOrder,
        }),
      }
    );

    setLoading(false);

    alert('Section updated');
  }

  return (
    <Card>
      <CardContent
        className="
          p-6
          space-y-6
        "
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              Title
            </label>

            <Input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              Display Order
            </label>

            <Input
              type="number"
              value={displayOrder}
              onChange={(e) =>
                setDisplayOrder(
                  Number(
                    e.target.value
                  )
                )
              }
            />
          </div>

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              MDX Content
            </label>

            <Textarea
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
              className="
                min-h-100
                font-mono
              "
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Saving...'
              : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
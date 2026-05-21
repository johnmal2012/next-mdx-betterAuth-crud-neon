'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SectionFormData = {
  slug: string;
  title: string;
  content: string;
  displayOrder: number;
};

type FormErrors = {
  slug?: string;
  title?: string;
  content?: string;
  displayOrder?: string;
  general?: string;
};

type ApiFieldError = {
  path: string[];
  message: string;
};

type Props = {
  initialData?: {
    id: number;
    slug: string;
    title: string;
    content: string;
    displayOrder: number;
  };
};

export default function SectionCreateForm({ initialData }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<SectionFormData>({
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    content: initialData?.content || '',
    displayOrder: initialData?.displayOrder || 1,
  });

  function updateField(field: keyof SectionFormData, value: string | number) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrors({});

    try {
      const method = initialData ? 'PUT' : 'POST';

      const url = initialData
        ? `/api/sections/${initialData.id}`
        : '/api/sections';
    //   console.log(
    //     'Submitting form to: ',
    //     url,
    //     'with method: ',
    //     method,
    //     'and form data: ',
    //     form,
    //   );
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        // throw new Error('Failed to save section.');
        const fieldErrors: FormErrors = {};

        data.fieldErrors.forEach((err: ApiFieldError) => {
          const field = err.path[0] as keyof FormErrors; // slug, content, etc.
          fieldErrors[field] = err.message;
        });

        setErrors(fieldErrors);

        return;
      }

      startTransition(() => {
        router.push('/admin/sections');
        router.refresh();
      });
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Something went wrong.',
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {initialData ? 'Edit Section' : 'Create Section'}
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage physician page section title and content; manage the display
            order on the admin page.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Slug */}
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>

            <input
              id="slug"
              value={form.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              placeholder="Key to lookup each section. Use underscores for spaces, e.g. about_the_physician."
              className={cn('w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:ring-2', errors.slug && 'border-destructive')}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug}</p>
            )}
            {/* <p className="text-xs text-muted-foreground">
              URL-friendly unique identifier.
            </p> */}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>

            <input
              id="title"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Title for each section, e.g. Education & Credentials."
              className={cn('w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:ring-2', errors.title && 'border-destructive')}
            />
          </div>
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title}</p>
          )}
          {/* Display Order */}
          <div className="space-y-2">
            <label htmlFor="displayOrder" className="text-sm font-medium">
              Display Order
            </label>

            <input
              id="displayOrder"
              type="number"
              min={1}
              value={form.displayOrder}
              onChange={(e) =>
                updateField('displayOrder', Number(e.target.value))
              }
              className={cn('w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:ring-2', errors.displayOrder && 'border-destructive')}
            />
            {errors.displayOrder && (
              <p className="text-sm text-destructive">{errors.displayOrder}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first on the admin page, left to right and
              top to bottom.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>

            <textarea
              id="content"
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Write section content here..."
              className={cn('min-h-100 w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:ring-2', errors.content && 'border-destructive')}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Use markdown symbols for formatting: # for headings, ** for bold,
              * for italic.
            </p>
          </div>

          {/* Error */}
          {errors.general && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errors.general}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" 
            className='h-10 w-24 bg-green-600! hover:bg-green-700!'
            disabled={isPending}>
              {isPending
                ? 'Saving...'
                : initialData
                  ? 'Update'
                  : 'Create'}
            </Button>

            <Button
              type="button"
              className='h-10 w-24'
              variant="outline"
              onClick={() => router.push('/admin/sections')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

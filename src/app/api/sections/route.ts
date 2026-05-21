import { db } from '@/db/db';

import { physicianSections } from '@/db/schema/physician-sections';
import { physicianSectionSchema } from '@/lib/validations/physician-section';

export async function GET() {
  const sections = await db.select().from(physicianSections);

  return Response.json(sections);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = physicianSectionSchema.safeParse(body);
    //   console.log('Received POST request with body: ', body);
    //   console.log('Validation result: ', result);

    if (!result.success) {
      // console.log('Validation errors: ', result.error.issues);
      return Response.json(
        {
          fieldErrors: result.error.issues,
        },
        { status: 400 },
      );
    }

    const validated = result.data;

    const inserted = await db
      .insert(physicianSections)
      .values(validated)
      .returning();

    return Response.json(inserted[0]);
  } catch (error) {
    console.error('POST /api/sections error:', error);

    return Response.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}

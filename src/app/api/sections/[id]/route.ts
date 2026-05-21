import { eq } from 'drizzle-orm';

import { db } from '@/db/db';

import { physicianSections } from '@/db/schema/physician-sections';

import { physicianSectionUpdateSchema } from '@/lib/validations/physician-section';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// =====================
// PUT (FULL REPLACE)
// =====================
export async function PUT(req: Request, { params }: Props) {
  try {
    const { id } = await params;

    const body = await req.json();

    const result = physicianSectionUpdateSchema.safeParse(body);

    const existingSection = await db.query.physicianSections.findFirst({
      where: eq(physicianSections.id, Number(id)),
    });

    if (!existingSection) {
      return Response.json(
        {
          success: false,
          message: 'Section not found',
        },
        {
          status: 404,
        },
      );
    }

    if (!result.success) {
      return Response.json(
        {
          success: false,
          fieldErrors: result.error.issues,
        },
        { status: 400 },
      );
    }

    const updated = await db
      .update(physicianSections)
      .set(result.data)
      .where(eq(physicianSections.id, Number(id)))
      .returning();

    return Response.json({
      success: true,
      updated: updated[0],
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: 'Failed to update section',
      },
      { status: 500 },
    );
  }
}

// =====================
// PATCH (PARTIAL UPDATE)
// =====================
export async function PATCH(req: Request, { params }: Props) {
  try {
    const { id } = await params;

    const body = await req.json();

    const result = physicianSectionUpdateSchema.safeParse(body);

    if (!result.success) {
      console.log('Validation errors: ', result.error.issues);
      return Response.json(
        {
          fieldErrors: result.error.issues,
        },
        { status: 400 },
      );
    }

    const existingSection = await db.query.physicianSections.findFirst({
      where: eq(physicianSections.id, Number(id)),
    });

    if (!existingSection) {
      return Response.json(
        {
          success: false,
          message: 'Section not found',
        },
        {
          status: 404,
        },
      );
    }

    const updated = await db
      .update(physicianSections)
      .set(result.data)
      .where(eq(physicianSections.id, Number(id)));

    return Response.json({
      success: true,
      updated,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: 'Failed to update section',
      },
      { status: 500 },
    );
  }
}

// =====================
// DELETE
// =====================
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id } = await params;

    // console.log('Deleting section:', id);

    // CHECK IF RECORD EXISTS FIRST
    const existingSection = await db.query.physicianSections.findFirst({
      where: eq(physicianSections.id, Number(id)),
    });

    if (!existingSection) {
      return Response.json(
        {
          success: false,
          message: 'Section not found',
        },
        {
          status: 404,
        },
      );
    }

    const deleted = await db
      .delete(physicianSections)
      .where(eq(physicianSections.id, Number(id)))
      .returning();

    return Response.json({
      success: true,
      deleted: deleted[0],
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: 'Failed to delete section',
      },
      { status: 500 },
    );
  }
}

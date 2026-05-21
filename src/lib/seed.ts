// load .env before process.env.DATABASE_URL is accessed in db.ts; then you can run pnpm tsx src/lib/seed.ts
// import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.local',
});

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// import { db } from '@/db/db';
// import { physicianSections } from '@/db/schema';

// const folder = path.join(
//   process.cwd(),
//   'src/content/physician'
// );

async function seed() {
  // dynamic imports AFTER env loads
  const { db } = await import('@/db/db');

  const { physicianSections } = await import('@/db/schema/physician-sections');

  const folder = path.join(process.cwd(), 'src/content/physician');

  // clear existing data to prevent duplicates on multiple runs
  await db.delete(physicianSections);

  const files = fs.readdirSync(folder);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(folder, file), 'utf-8');

    const { content, data } = matter(raw);

    const slug = file.replace('.mdx', '');

    await db.insert(physicianSections).values({
      slug,
      title: data.title,
      content,
    });
  }

  console.log('Seed complete');
}

seed();

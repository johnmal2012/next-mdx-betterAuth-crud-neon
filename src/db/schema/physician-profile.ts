import { pgTable, serial, text, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const physicianProfile = pgTable('physician_profile', {
  id: serial('id').primaryKey(),

  logo: text('logo').notNull(),

  name: text('name').notNull(),

  boardSpecialty: text('board_specialty').notNull(),

  specialty: text('specialty').notNull(),

  title: text('title').notNull(),

  image: text('image').notNull(),

  clinicName: text('clinic_name').notNull(),

  clinicAddress: text('clinic_address').notNull(),

  phone: text('phone').notNull(),

  email: text('email').notNull(),

  address: text('address').notNull(),

  location: text('location').notNull(),

  linkName: text('link_name').notNull(),

  footCareLink: text('footcare_link').notNull(),

  expertise: jsonb('expertise').$type<string[]>().notNull().default([]),

  navItems: jsonb('nav_items').$type<
    {
      label: string;
      href: string;
    }[]
  >().notNull().default([]),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at').defaultNow(),
});

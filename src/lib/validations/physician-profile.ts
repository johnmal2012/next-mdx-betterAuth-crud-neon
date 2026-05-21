import { z } from 'zod';

export const physicianProfileSchema =
  z.object({
    logo: z.string().min(1, 'Logo name is required'),

    name: z.string().min(1, 'Full name with title is required'),

    boardSpecialty:
      z.string().min(1, 'Official Title is required'),

    specialty:
      z.string().min(1, 'Specialty name is required'),

    title: z.string().min(1, 'Title is required'),

    image: z.string().min(1, 'Image URL is required'),

    clinicName:
      z.string().min(1, 'Clinic Name is required'),

    clinicAddress:
      z.string().min(1, 'Clinic Address is required'),

    phone: z.string().min(1, 'Phone is required'),

    email: z.email('Please enter a valid email'),

    address: z.string().min(1, 'Address is required'),

    location:
      z.string().min(1, 'Location is required'),

    linkName:
      z.string().min(1, 'External Site Name is required'),

    footCareLink:
      z.url('Please enter a valid URL for the external site'),

    expertise: z.array(
      z.string().min(1, 'At least one expertise is required and separate multiple expertise with commas')
    ),

    navItems: z.array(
      z.object({
        label: z.string('Label is required'),
        href: z.string('Section reference is required'),
      })
    ),
  });

export type PhysicianProfileInput = z.infer<
  typeof physicianProfileSchema
>;
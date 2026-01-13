import { z } from 'zod'

export const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  streetAddress: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(4, 'Postal code must be at least 4 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
})

export type ShippingFormData = z.infer<typeof shippingSchema>

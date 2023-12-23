import { z } from 'zod';

export const AuthDtoSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  address: z.string().optional(),
  phone: z.string().optional(),
  roleId: z.number().int(),
  birthday: z.date(),
});
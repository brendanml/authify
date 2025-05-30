import { z } from 'zod';

export const newUserSchema = z.object({
  username: z.string().min(2, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
})

export type NewUser = z.infer<typeof newUserSchema>;
export type SafeUser = Omit<NewUser, "password">;
import { z } from 'zod';

export const signUpSchema = z.object({
  first_name: z.string().min(3, "Must be at least 3 characters").max(50),
  last_name: z.string().min(3, "Must be at least 3 characters").max(50),
  username: z.string().min(3, "Must be at least 3 characters").max(20),
  university_email: z.string().email("Must be a valid email address"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[a-z]/, "At least 1 lowercase letter")
    .regex(/[A-Z]/, "At least 1 uppercase letter")
    .regex(/[0-9]/, "At least 1 number")
    .regex(/[@$!%*?&#]/, "At least 1 special character (@$!%*?&#)")
    .max(64, "Password cannot exceed 64 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
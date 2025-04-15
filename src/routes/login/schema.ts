import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string()
		.min(1, "Email is required")
		.email("Need a valid email"),
	password: z.string()
		.min(8, "Password must be at least 8 characters")
		.max(100, "Password is too long")
});
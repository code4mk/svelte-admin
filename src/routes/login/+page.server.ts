import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from './schema';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			// Add your authentication logic here
			// For example:
			// const user = await authenticateUser(form.data.email, form.data.password);
			// if (!user) {
			//     return message(form, 'Invalid credentials', { status: 400 });
			// }

			return message(form, 'Login successful!');
		} catch (error) {
			return fail(500, {
				form,
				message: 'Authentication failed'
			});
		}
	}
};
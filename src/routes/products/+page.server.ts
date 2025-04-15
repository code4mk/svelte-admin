import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { productSchema } from './schema';
import { fail } from '@sveltejs/kit';

export const load = async () => {
    const form = await superValidate(zod(productSchema));
    return { 
        form,
        categories: ['Electronics', 'Clothing', 'Books', 'Food', 'Other'] // Example categories
    };
};

export const actions = {
    default: async ({ request }: { request: Request }) => {
        const form = await superValidate(request, zod(productSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        // Add your product saving logic here
        console.log('Product data:', form.data);
        
        return message(form, 'Product added successfully!');
    }
}; 
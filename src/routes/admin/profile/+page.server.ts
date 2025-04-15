import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

const profileSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    location: z.string().min(1, "Location is required"),
    profileImage: z.string().optional()
});

export const load = async () => {
    // Pre-fill with dummy data
    const form = await superValidate({
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 000-0000",
        location: "New York, USA"
    }, zod(profileSchema));

    return { form };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(profileSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        // Add your profile update logic here
        console.log('Profile data:', form.data);
        
        return { form };
    }
}; 
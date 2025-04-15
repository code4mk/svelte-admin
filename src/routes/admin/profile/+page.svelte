<script lang="ts">
    import AdminLayout from '$lib/components/AdminLayout.svelte';
    import { User, Mail, Phone, MapPin, Camera } from '@lucide/svelte';
    import { superForm } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import toast from 'svelte-french-toast';

    export let data;

    const { form, errors, enhance } = superForm(data.form, {
        onUpdated: ({ form }) => {
            if (form.valid) {
                toast.success('Profile updated successfully');
            }
        }
    });

    let profileImage: string | null = null;
    
    function handleImageUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage = e.target?.result as string;
            };
            reader.readAsDataURL(target.files[0]);
        }
    }
</script>

<AdminLayout>
    <div class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        <p class="mt-2 text-sm text-gray-700">Manage your account settings and preferences.</p>

        <form class="mt-8 space-y-8" use:enhance>
            <!-- Profile Photo -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-6">Profile Photo</h2>
                <div class="flex items-center">
                    <div class="relative">
                        <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {#if profileImage}
                                <img src={profileImage} alt="Profile" class="w-full h-full object-cover" />
                            {:else}
                                <User class="w-12 h-12 text-gray-400" />
                            {/if}
                        </div>
                        <label class="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-700">
                            <Camera class="w-4 h-4 text-white" />
                            <input type="file" class="hidden" accept="image/*" on:change={handleImageUpload} />
                        </label>
                    </div>
                    <div class="ml-6">
                        <p class="text-sm font-medium text-gray-900">Upload new photo</p>
                        <p class="text-sm text-gray-500 mt-1">JPG, GIF or PNG. Max size of 2MB</p>
                    </div>
                </div>
            </div>

            <!-- Personal Information -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-6">Personal Information</h2>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div class="relative">
                            <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                bind:value={$form.name}
                                class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                placeholder="John Doe"
                            />
                        </div>
                        {#if $errors.name}
                            <p class="mt-1.5 text-sm text-red-500">{$errors.name}</p>
                        {/if}
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div class="relative">
                            <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                bind:value={$form.email}
                                class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                placeholder="john@example.com"
                            />
                        </div>
                        {#if $errors.email}
                            <p class="mt-1.5 text-sm text-red-500">{$errors.email}</p>
                        {/if}
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <div class="relative">
                            <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                bind:value={$form.phone}
                                class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                        {#if $errors.phone}
                            <p class="mt-1.5 text-sm text-red-500">{$errors.phone}</p>
                        {/if}
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <div class="relative">
                            <MapPin class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                bind:value={$form.location}
                                class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                placeholder="New York, USA"
                            />
                        </div>
                        {#if $errors.location}
                            <p class="mt-1.5 text-sm text-red-500">{$errors.location}</p>
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
                <button
                    type="submit"
                    class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</AdminLayout> 
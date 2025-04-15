<script lang="ts">
    import { page } from '$app/stores';
    import { superForm } from 'sveltekit-superforms';
    import Select from 'svelte-select';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import { valibotClient } from 'sveltekit-superforms/adapters';
    import { productSchema } from './schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import toast from 'svelte-french-toast';
    import AdminLayout from '$lib/components/AdminLayout.svelte';

    export let data;

    const { form, errors, message, enhance } = superForm(data.form, {
        dataType: 'json',
        validationMethod: 'oninput',
        validators: zod(productSchema),
        onUpdated: (form) => {
            if(form.form.valid){   
                toast.success('Product added successfully');
            }
        }
    });

    let selectedCategory: any = null;

    // Handle category selection and clearing
    function handleSelect(event: any) {
      $form.category = event.detail.value;
    }

    function handleClear() {
      selectedCategory = null;
      $form.category = '';
    }
</script>

<AdminLayout>
    <form method="POST" use:enhance class="max-w-[600px] mx-auto my-8 p-8 bg-white shadow-sm rounded-lg">
        {#if $message && $page.status === 200}
            <div class="w-full bg-green-50 text-green-600 p-2 mb-6">
                {$message}
            </div>
        {/if}

        <label class="block mb-6">
            Product Name
            <input 
                name="name" 
                type="text"
                class="w-full px-3 py-2 mt-2 bg-gray-50 rounded-md"
                aria-invalid={$errors.name ? 'true' : undefined} 
                bind:value={$form.name} 
            />
            {#if $errors.name}
                <span class="text-red-600 text-sm mt-1">{$errors.name}</span>
            {/if}
        </label>

        <label class="block mb-6">
            Category
            <Select
                items={data.categories}
                bind:value={selectedCategory}
                on:select={handleSelect}
                on:clear={handleClear}
                class="mt-2"
            />
            {#if $errors.category}
                <span class="text-red-600 text-sm mt-1">{$errors.category}</span>
            {/if}
        </label>

        <label class="block mb-6">
            Price
            <input 
                name="price" 
                type="number"
                step="0.01"
                class="w-full px-3 py-2 mt-2 bg-gray-50 rounded-md"
                aria-invalid={$errors.price ? 'true' : undefined} 
                bind:value={$form.price} 
            />
            {#if $errors.price}
                <span class="text-red-600 text-sm mt-1">{$errors.price}</span>
            {/if}
        </label>

        <label class="block mb-6">
            Description
            <textarea 
                name="description" 
                class="w-full px-3 py-2 mt-2 bg-gray-50 rounded-md"
                aria-invalid={$errors.description ? 'true' : undefined}
                bind:value={$form.description}
            ></textarea>
            {#if $errors.description}
                <span class="text-red-600 text-sm mt-1">{$errors.description}</span>
            {/if}
        </label>

        <button class="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium">
            Add Product
        </button>
    </form>
</AdminLayout> 
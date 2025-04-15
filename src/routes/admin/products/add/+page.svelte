<script lang="ts">
  import { page } from '$app/stores';
  import { superForm } from 'sveltekit-superforms';
  import Select from 'svelte-select';
  import { zod } from 'sveltekit-superforms/adapters';
  import { productSchema } from './schema';
  import toast from 'svelte-french-toast';
  import AdminLayout from '$lib/components/AdminLayout.svelte';
  import { Plus, X, Upload, ArrowLeft } from '@lucide/svelte';

  export let data;

  const { form, errors, message, enhance } = superForm(data.form, {
      dataType: 'json',
      validationMethod: 'oninput',
      validators: zod(productSchema),
      onUpdated: (form) => {
          if(form.form.valid) {   
              toast.success('Product added successfully');
          }
      }
  });

  let selectedCategory: any = null;
  let selectedStatus: any = null;
  let isDragging = false;

  function handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
          const file = target.files[0];
          // Handle image upload logic here
      }
  }

  const selectStyles = {
      container: 'border border-gray-200 rounded-lg',
      input: 'h-[42px]',
      item: 'hover:bg-gray-100 rounded-md'
  };
</script>

<AdminLayout>
  <div class="min-h-screen bg-gray-50/50">
      <div class="max-w-5xl mx-auto px-4 py-8">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
              <div>
                  <div class="flex items-center gap-2 mb-2">
                      <a href="/admin/products" class="text-gray-500 hover:text-gray-700">
                          <ArrowLeft class="w-5 h-5" />
                      </a>
                      <h1 class="text-2xl font-semibold text-gray-900">Add New Product</h1>
                  </div>
                  <p class="text-sm text-gray-600">Fill in the details below to add a new product to your store.</p>
              </div>
              
              <div class="flex gap-3">
                  <button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                      Save as Draft
                  </button>
                  <button form="product-form" type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                      Publish Product
                  </button>
              </div>
          </div>

          <form id="product-form" method="POST" use:enhance class="grid grid-cols-3 gap-6">
              <!-- Main Content -->
              <div class="col-span-2 space-y-6">
                  <!-- Basic Information -->
                  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h2 class="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
                      
                      <div class="space-y-6">
                          <div>
                              <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                              <input 
                                  name="name"
                                  type="text"
                                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                  placeholder="Enter product name"
                                  bind:value={$form.name}
                              />
                              {#if $errors.name}
                                  <p class="mt-1.5 text-sm text-red-500">{$errors.name}</p>
                              {/if}
                          </div>

                          <div>
                              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                              <textarea
                                  rows="4"
                                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                  placeholder="Enter product description"
                                  bind:value={$form.description}
                              ></textarea>
                              {#if $errors.description}
                                  <p class="mt-1.5 text-sm text-red-500">{$errors.description}</p>
                              {/if}
                          </div>
                      </div>
                  </div>

                  <!-- Media -->
                  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h2 class="text-lg font-medium text-gray-900 mb-6">Media</h2>
                      
                      <div 
                          class="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"
                          class:border-indigo-500={isDragging}
                          on:dragenter={() => isDragging = true}
                          on:dragleave={() => isDragging = false}
                          on:dragover|preventDefault
                          on:drop|preventDefault={() => isDragging = false}
                      >
                          <Upload class="w-8 h-8 text-gray-400 mx-auto mb-4" />
                          <div class="text-sm text-gray-600">
                              <label class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                                  <span>Upload a file</span>
                                  <input type="file" class="sr-only" accept="image/*" multiple on:change={handleImageUpload}>
                              </label>
                              <p class="pl-1">or drag and drop</p>
                          </div>
                          <p class="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                      </div>
                  </div>
              </div>

              <!-- Sidebar -->
              <div class="space-y-6">
                  <!-- Status & Organization -->
                  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h2 class="text-lg font-medium text-gray-900 mb-6">Organization</h2>
                      
                      <div class="space-y-6">
                          <div>
                              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                              <Select
                                  items={data.statuses}
                                  bind:value={selectedStatus}
                                  placeholder="Select status"
                                  styles={selectStyles}
                              />
                          </div>

                          <div>
                              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                              <Select
                                  items={data.categories}
                                  bind:value={selectedCategory}
                                  placeholder="Select category"
                                  styles={selectStyles}
                              />
                          </div>

                          <div>
                              <label class="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                              <input 
                                  type="text"
                                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                  placeholder="Enter SKU"
                                  bind:value={$form.sku}
                              />
                          </div>
                      </div>
                  </div>

                  <!-- Pricing -->
                  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h2 class="text-lg font-medium text-gray-900 mb-6">Pricing</h2>
                      
                      <div class="space-y-6">
                          <div>
                              <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
                              <div class="relative">
                                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <span class="text-gray-500">$</span>
                                  </div>
                                  <input
                                      type="number"
                                      step="0.01"
                                      class="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                      placeholder="0.00"
                                      bind:value={$form.price}
                                  />
                              </div>
                          </div>

                          <div>
                              <label class="block text-sm font-medium text-gray-700 mb-2">Inventory</label>
                              <input
                                  type="number"
                                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                  placeholder="0"
                                  bind:value={$form.inventory}
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </form>
      </div>
  </div>
</AdminLayout>
<script lang="ts">
    import axios from 'axios';
    import { goto } from '$app/navigation';

    let formData1 = {
        title: '',
        body: '',
        tags: '',
        userId: 1,
        category: 'general'
    };

    let formData = $state(formData1);

    // Add reactive statement for category changes
    // $: if (formData.category) {
    //     console.log(`Category changed to: ${formData.category}`);
    // }

    

    let submitting = $state(false);
    let error = $state<string | null>(null);

    $effect(() => {
        if (formData.category) {
            console.log(`Category changed to: ${formData.category}`);
        }
    })

    async function handleSubmit() {
        submitting = true;
        error = null;

        try {
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const response = await axios.post('https://dummyjson.com/posts/add', {
                ...formData,
                tags: tagsArray
            });

            if (response.data.id) {
                await goto('/blog/' + response.data.id);
            }
        } catch (err) {
            error = 'Failed to create post. Please try again.';
            console.error('Error creating post:', err);
        } finally {
            submitting = false;
        }
    }
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
        <div class="mb-8">
            <a href="/blog" class="text-blue-600 hover:text-blue-800 flex items-center group">
                <svg class="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Blog
            </a>
        </div>

        <div class="bg-white shadow-xl rounded-lg overflow-hidden">
            <div class="px-8 py-6 border-b border-gray-200">
                <h1 class="text-3xl font-bold text-gray-900">Create New Post</h1>
                <p class="mt-2 text-sm text-gray-600">Share your thoughts with the world</p>
            </div>

            <form onsubmit={e => { e.preventDefault(); handleSubmit(); }} class="px-8 py-6 space-y-6">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        bind:value={formData.title}
                        class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter post title"
                        required
                    />
                </div>

                <div>
                    <label for="body" class="block text-sm font-medium text-gray-700">Content</label>
                    <div class="mt-1">
                        <textarea
                            id="body"
                            bind:value={formData.body}
                            rows="8"
                            class="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Write your post content here..."
                            required
                        ></textarea>
                    </div>
                    <p class="mt-2 text-sm text-gray-500">Write your post in plain text.</p>
                </div>

                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        bind:value={formData.category}
                        class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="general">General</option>
                        <option value="technology">Technology</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="travel">Travel</option>
                        <option value="food">Food</option>
                    </select>
                    <p class="mt-2 text-sm text-gray-500">Select the main category for your post</p>
                </div>

                <div>
                    <label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        bind:value={formData.tags}
                        class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="technology, programming, web"
                    />
                    <p class="mt-2 text-sm text-gray-500">Separate tags with commas</p>
                </div>

                {#if error}
                    <div class="rounded-md bg-red-50 p-4">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                {/if}

                <div class="pt-4">
                    <button
                        type="submit"
                        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={submitting}
                    >
                        {#if submitting}
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Creating Post...
                        {:else}
                            Create Post
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

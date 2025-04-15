<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { httpApi } from '$lib/utils/http';
    import type { Post, PostsResponse } from '$lib/types';

    let posts: Post[] = [];
    let loading: boolean = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            const response = await httpApi.get('/posts');
            posts = response.data.posts;
        } catch (err) {
            error = 'Failed to load blog posts';
            console.error('Error fetching posts:', err);
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>Blog Posts | My SvelteKit App</title>
    <meta name="description" content="Read our latest blog posts">
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Blog Posts</h1>

    {#if loading}
        <div class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    {:else if error}
        <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
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
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each posts as post (post.id)}
                <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-2">
                            <a href="/blog/{post.id}" class="hover:text-blue-600 transition-colors duration-200">
                                {post.title}
                            </a>
                        </h2>
                        <p class="text-gray-600 mb-4">{post.body.slice(0, 150)}...</p>
                        <div class="space-y-3">
                            <div class="flex flex-wrap gap-2">
                                {#each post.tags as tag}
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                                        #{tag}
                                    </span>
                                {/each}
                            </div>
                            <div class="flex items-center space-x-4 text-gray-500 text-sm">
                                <span class="flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                    {post.views}
                                </span>
                                <span class="flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                                    </svg>
                                    {post.reactions.likes}
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            {/each}
        </div>
    {/if}
</div>

<style>
    /* Same styles as before */
</style> 
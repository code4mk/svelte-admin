<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import type { Post } from '$lib/types';
    import { httpApi } from '$lib/utils/http';
    import { get } from 'svelte/store';

    let post: Post | null = null;
    let loading: boolean = true;
    let error: string | null = null;

    // Access the route param from the $page store
    const id = get(page).params.id;
    console.log(id);

    export let data: { id: string };


    onMount(async () => {
        try {
            const response = await httpApi.get(`/posts/${data.id}`);
            post = response.data;
        } catch (err) {
            error = 'Failed to load blog post';
            console.error('Error fetching post:', err);
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    {#if post}
        <title>{post.title} | My SvelteKit App</title>
        <meta name="description" content={post.body.slice(0, 155)}>
    {/if}
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <nav class="mb-8">
        <a href="/blog" class="text-blue-600 hover:text-blue-800 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Blog
        </a>
    </nav>

    {#if loading}
        <div class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    {:else if error}
        <div class="bg-red-50 border-l-4 border-red-400 p-4">
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
    {:else if post}
        <article class="bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
            
            <div class="mb-8 space-y-4">
                <div class="flex flex-wrap gap-2">
                    {#each post.tags as tag}
                        <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                            #{tag}
                        </span>
                    {/each}
                </div>
                <div class="flex items-center space-x-6 text-gray-500">
                    <span class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        {post.views} views
                    </span>
                    <span class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                        </svg>
                        {post.reactions.likes} likes
                    </span>
                    <span class="flex items-center">
                        <svg class="w-5 h-5 mr-2 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                        </svg>
                        {post.reactions.dislikes} dislikes
                    </span>
                </div>
            </div>

            <div class="prose prose-lg max-w-none">
                <p class="text-gray-700 leading-relaxed">{post.body}</p>
            </div>
        </article>
    {/if}
</div>

<style>
    /* Same styles as before */
</style> 
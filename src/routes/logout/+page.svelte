<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';
    import toast from 'svelte-french-toast';
    import Cookies from 'universal-cookie';

    const cookies = new Cookies();

    onMount(() => {
        // Remove the auth cookie
        cookies.remove('is_auth', { path: '/' });
        
        // Update auth state
        auth.logout();
        
        // Show success message
        toast.success('Logged out successfully');
        
        // Redirect to login page
        goto('/login');
    });
</script>

<div class="flex items-center justify-center h-screen">
    <p>Logging out...</p>
</div>

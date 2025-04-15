<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { isAuthenticated } from '$lib/stores/auth';
    import toast from 'svelte-french-toast';
    import Cookies from 'universal-cookie';

    const cookies = new Cookies();

    export let children: any;

    onMount(() => {
        // Check cookies on mount using universal-cookie
        const isAuth = cookies.get('is_auth');

        if (!isAuth) {
            isAuthenticated.set(false);
            toast.error('Please login to access this page');
            goto('/login');
        } else {
          isAuthenticated.set(true)
        }

        const unsubscribe = isAuthenticated.subscribe(value => {
            if (!value) {
                //toast.error('Please login to access this page');
                goto('/login');
            }
        });

        return () => {
            unsubscribe();
        };
    });
</script>

{#if $isAuthenticated}
    <slot />
{/if} 
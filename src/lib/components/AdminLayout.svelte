<script lang="ts">
    import Header from './Header.svelte';
    import Sidebar from './Sidebar.svelte';
    import ProtectedRoute from './ProtectedRoute.svelte';
    import { sidebarOpen } from '$lib/stores/sidebar';
</script>

<ProtectedRoute>
    <div class="min-h-screen bg-gray-100">
        <Header />
        
        <div class="flex pt-16">
            <Sidebar />
            
            <main class="flex-1 transition-all duration-200 ease-in-out {$sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'} pt-2">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</ProtectedRoute> 
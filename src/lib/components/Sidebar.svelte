<script lang="ts">
    import { page } from '$app/stores';
    import { Home, ShoppingBag, ShoppingCart, Users } from '@lucide/svelte';
    import { sidebarOpen } from '$lib/stores/sidebar';
    
    // Custom transition function for sliding from left
    function slideFromLeft(node: Element, { duration = 200 }) {
        return {
            duration,
            css: (t: number) => {
                const eased = t;
                return `
                    transform: translateX(${(1 - eased) * -100}%);
                    opacity: ${eased};
                `;
            }
        };
    }

    const menuItems = [
        { label: 'Dashboard', href: '/admin', icon: Home },
        { label: 'Products', href: '/admin/products', icon: ShoppingBag },
        { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
        { label: 'Customers', href: '/admin/customers', icon: Users }
    ];
</script>

<div class="fixed left-0 z-40">
    <aside 
        class="w-64 bg-white shadow-sm h-screen  transform transition-transform duration-200 ease-in-out {$sidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
    >
        <nav class="p-4">
            {#each menuItems as item}
                <a
                    href={item.href}
                    class="group flex items-center px-2 py-2 text-sm font-medium rounded-md {$page.url.pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
                >
                    <svelte:component 
                        this={item.icon}
                        class="mr-3 h-6 w-6 {$page.url.pathname === item.href ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}"
                    />
                    {item.label}
                </a>
            {/each}
        </nav>
    </aside>
</div> 
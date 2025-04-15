<script lang="ts">
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { createMenu } from 'svelte-headlessui';
    import Transition from 'svelte-transition';
    import { UserCircle, ChevronDown, Bell, Menu, PanelLeftClose, PanelLeft } from '@lucide/svelte';
    import Logo from '$lib/images/logo/logo.png';
    import { sidebarOpen } from '$lib/stores/sidebar';

    function handleLogout() {
        auth.logout();
        goto('/login');
    }

    const profileMenu = createMenu({ label: 'Profile' });

    const menuItems = [
        { text: 'Your profile', action: () => goto('/profile') },
        { text: 'Sign out', action: () => goto('/logout') }
    ];

    // You can replace this with actual user data from your auth store
    const user = {
        name: 'Tom Cook',
        avatar: '../images/logo/logo.png' // Add actual avatar path
    };
</script>

<header class="bg-white shadow-sm fixed w-full z-10">
    <div class="flex justify-between items-center h-16">
        <div class="flex items-center pl-4">
            <button 
                class="p-2 mr-2 text-gray-400 hover:text-gray-500"
                on:click={() => $sidebarOpen = !$sidebarOpen}
            >
                {#if $sidebarOpen}
                    <PanelLeftClose class="h-6 w-6" />
                {:else}
                    <PanelLeft class="h-6 w-6" />
                {/if}
            </button>
            <img src={Logo} alt="Company Logo" class="h-6 w-6" />
            <span class="ml-2 text-lg font-medium text-gray-900">Admin Dashboard</span>
        </div>
        
        <div class="flex items-center mr-4 gap-4">
            <!-- Notification Bell -->
            <button class="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell class="h-6 w-6" />
            </button>

            <!-- Profile Dropdown -->
            <div class="relative">
                <button
                    use:profileMenu.button
                    class="flex items-center gap-2 max-w-xs rounded-full text-sm focus:outline-none cursor-pointer"
                >
                    <span class="sr-only">Open user menu</span>
                    {#if user.avatar}
                    <UserCircle class="h-8 w-8 text-gray-400" />
                    {:else}
                        <UserCircle class="h-8 w-8 text-gray-400" />
                    {/if}
                    <span class="hidden md:flex items-center">
                        <span class="text-sm font-medium text-gray-700">{user.name}</span>
                        <ChevronDown class="ml-2 h-4 w-4 text-gray-400" />
                    </span>
                </button>

                <Transition
                    show={$profileMenu.expanded}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div
                        use:profileMenu.items
                        class="absolute right-0 mt-2 w-48 origin-top-right  bg-white py-1 focus:outline-none border border-gray-200 rounded-md"
                    >
                        {#each menuItems as item}
                            {@const active = $profileMenu.active === item.text}
                            <button
                                use:profileMenu.item
                                on:click={item.action}
                                class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer {active ? 'bg-gray-50' : ''}"
                            >
                                {item.text}
                            </button>
                        {/each}
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</header> 
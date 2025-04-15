<script lang="ts">
    import AdminLayout from '$lib/components/AdminLayout.svelte';
    import { 
        ShoppingBag, 
        Users, 
        DollarSign, 
        Package, 
        TrendingUp, 
        TrendingDown,
        ArrowUpRight,
        ArrowDownRight,
        CircleDollarSign,
        Users2,
        Box
    } from '@lucide/svelte';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    export let data: any;

    const stats = [
        {
            name: 'Total Revenue',
            value: '$45,231.89',
            change: '+2%',
            trend: 'up',
            icon: CircleDollarSign,
            bgColor: 'bg-indigo-500'
        },
        {
            name: 'Total Orders',
            value: '356',
            change: '+12.5%',
            trend: 'up',
            icon: ShoppingBag,
            bgColor: 'bg-indigo-500'
        },
        {
            name: 'Total Customers',
            value: '2,103',
            change: '+18.2%',
            trend: 'up',
            icon: Users2,
            bgColor: 'bg-indigo-500'
        },
        {
            name: 'Products Sold',
            value: '891',
            change: '-4.5%',
            trend: 'down',
            icon: Box,
            bgColor: 'bg-indigo-500'
        }
    ];

    // Recent orders from the data prop
    let recentOrders = data.recentOrders || [];
    let lowStockProducts = data.lowStockProducts || [];

    // Revenue Chart Options
    let revenueChartOptions = {
        chart: {
            type: "line",
            height: 350,
            toolbar: {
                show: false
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        series: [{
            name: "Revenue",
            data: [30500, 42000, 35800, 49000, 44000, 45200]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        colors: ['#6366f1']
    };

    // Category Chart Options
    let categoryChartOptions = {
        chart: {
            type: "donut",
            height: 350
        },
        series: [4500, 3800, 2900, 1800],
        labels: ['Electronics', 'Clothing', 'Accessories', 'Books'],
        colors: ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899'],
        legend: {
            position: 'bottom'
        }
    };

    let ApexCharts;
    let chart: any;
    let mounted = false;
    
    onMount(async () => {
        const ApexChartsModule = await import('svelte-apexcharts');
        chart = ApexChartsModule.chart;
        mounted = true;
    });
</script>

<AdminLayout>
    <div class="px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p class="mt-2 text-sm text-gray-700">
                    Overview of your store's performance and recent activities.
                </p>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {#each stats as stat}
                <div class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
                    <div class="flex items-center">
                        <div class="rounded-xl {stat.bgColor} p-3">
                            <svelte:component this={stat.icon} class="h-5 w-5 text-white" />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">{stat.name}</p>
                            <div class="flex items-baseline">
                                <p class="text-xl font-semibold text-gray-900">{stat.value}</p>
                                <p class="ml-2 flex items-center text-sm font-medium {stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}">
                                    {#if stat.trend === 'up'}
                                        <ArrowUpRight class="h-3 w-3" />
                                    {:else}
                                        <ArrowDownRight class="h-3 w-3" />
                                    {/if}
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Charts Section -->
        <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- Revenue Trend Chart -->
            <div class="overflow-hidden rounded-lg bg-white shadow">
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-medium text-gray-900">Revenue Trend</h2>
                    </div>
                    <div class="mt-6">
                        {#if mounted && chart}
                            <div use:chart={revenueChartOptions} />
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Category Distribution Chart -->
            <div class="overflow-hidden rounded-lg bg-white shadow">
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-medium text-gray-900">Sales by Category</h2>
                    </div>
                    <div class="mt-6">
                        {#if mounted && chart}
                            <div use:chart={categoryChartOptions} />
                        {/if}
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 pb-6">
            <!-- Recent Orders -->
            <div class="overflow-hidden rounded-lg bg-white shadow">
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-medium text-gray-900">Recent Orders</h2>
                        <a href="/admin/orders" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            View all
                        </a>
                    </div>
                    <div class="mt-6 flow-root">
                        <ul role="list" class="-my-5 divide-y divide-gray-200">
                            {#each recentOrders as order}
                                <li class="py-5">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate">
                                                Order #{order.id}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate">{order.customerName}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-sm font-medium text-gray-900">${order.totalAmount}</p>
                                            <p class="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Low Stock Products -->
            <div class="overflow-hidden rounded-lg bg-white shadow pb-2">
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-medium text-gray-900">Low Stock Products</h2>
                        <a href="/admin/products" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            View all
                        </a>
                    </div>
                    <div class="mt-6 flow-root">
                        <ul role="list" class="-my-5 divide-y divide-gray-200">
                            {#each lowStockProducts as product}
                                <li class="py-5">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate">
                                                {product.name}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate">SKU: {product.sku}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-sm font-medium text-gray-900">{product.inventory} units</p>
                                            <p class="text-sm text-red-500">Low Stock</p>
                                        </div>
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</AdminLayout> 
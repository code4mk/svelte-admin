<script lang="ts">
    import AdminLayout from '$lib/components/AdminLayout.svelte';
    import { Package2, ArrowUpDown } from '@lucide/svelte';

    export let data: any;

    let orders: any[] = data.orders;
    let sortField: keyof any = 'orderDate';
    let sortDirection: 'asc' | 'desc' = 'desc';

    function getStatusColor(status: string): string {
        switch (status.toLowerCase()) {
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    function sortOrders(field: any) {
        if (sortField === field) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortField = field;
            sortDirection = 'asc';
        }

        orders = [...orders].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            const modifier = sortDirection === 'asc' ? 1 : -1;
            
            if (aVal < bVal) return -1 * modifier;
            if (aVal > bVal) return 1 * modifier;
            return 0;
        });
    }
</script>

<AdminLayout>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-2xl font-semibold text-gray-900">Orders</h1>
                <p class="mt-2 text-sm text-gray-700">A list of all orders in your store.</p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                    Add order
                </button>
            </div>
        </div>

        <div class="mt-8 flex flex-col">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-gray-300 ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        <button class="group inline-flex items-center" on:click={() => sortOrders('id')}>
                                            Order ID
                                            <ArrowUpDown class="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                                        </button>
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <button class="group inline-flex items-center" on:click={() => sortOrders('customerName')}>
                                            Customer
                                            <ArrowUpDown class="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                                        </button>
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <button class="group inline-flex items-center" on:click={() => sortOrders('totalAmount')}>
                                            Total
                                            <ArrowUpDown class="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                                        </button>
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <button class="group inline-flex items-center" on:click={() => sortOrders('orderDate')}>
                                            Date
                                            <ArrowUpDown class="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                                        </button>
                                    </th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                {#each orders as order}
                                    <tr>
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <div class="flex items-center">
                                                <Package2 class="h-5 w-5 text-gray-400 mr-2" />
                                                {order.id}
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <div>
                                                <div class="font-medium text-gray-900">{order.customerName}</div>
                                                <div class="text-gray-500">{order.email}</div>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 {getStatusColor(order.status)}">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                            ${order.totalAmount.toFixed(2)}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </td>
                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button class="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</AdminLayout> 
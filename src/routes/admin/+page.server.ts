export const load = async () => {
    // Get the 5 most recent orders
    const recentOrders = 150

    // Get products with low stock (less than 10 units)
    const lowStockProducts = 2000

    return {
        recentOrders,
        lowStockProducts
    };
}; 
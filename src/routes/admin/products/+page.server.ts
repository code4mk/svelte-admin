const dummyProducts: any[] = [
    {
        id: "PROD001",
        name: "Premium Headphones",
        sku: "HDX-100",
        price: 299.99,
        status: "In Stock",
        category: "Electronics",
        inventory: 45,
        lastUpdated: "2024-03-15"
    },
    {
        id: "PROD002",
        name: "Wireless Mouse",
        sku: "WM-200",
        price: 49.99,
        status: "Low Stock",
        category: "Accessories",
        inventory: 5,
        lastUpdated: "2024-03-14"
    },
    {
        id: "PROD003",
        name: "Gaming Keyboard",
        sku: "GK-300",
        price: 159.99,
        status: "Out of Stock",
        category: "Gaming",
        inventory: 0,
        lastUpdated: "2024-03-13"
    }
];

export const load = async () => {
    return {
        products: dummyProducts
    };
}; 
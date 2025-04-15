const dummyOrders: any[] = [
    {
        id: "ORD001",
        customerName: "John Doe",
        email: "john@example.com",
        status: "Processing",
        totalAmount: 299.99,
        orderDate: "2024-03-15",
        items: [
            { name: "Product 1", quantity: 2, price: 149.99 }
        ]
    },
    {
        id: "ORD002",
        customerName: "Jane Smith",
        email: "jane@example.com",
        status: "Shipped",
        totalAmount: 499.99,
        orderDate: "2024-03-14",
        items: [
            { name: "Product 2", quantity: 1, price: 499.99 }
        ]
    },
    {
        id: "ORD003",
        customerName: "Bob Wilson",
        email: "bob@example.com",
        status: "Delivered",
        totalAmount: 199.99,
        orderDate: "2024-03-13",
        items: [
            { name: "Product 3", quantity: 3, price: 66.66 }
        ]
    }
];

export const load = async () => {
    return {
        orders: dummyOrders
    };
}; 
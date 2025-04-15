const dummyCustomers: any[] = [
    {
        id: "CUST001",
        name: "John Doe",
        email: "john@example.com",
        status: "Active",
        lastOrder: "2024-03-15",
        totalOrders: 5
    },
    {
        id: "CUST002",
        name: "Jane Smith",
        email: "jane@example.com",
        status: "Active",
        lastOrder: "2024-03-14",
        totalOrders: 3
    },
    {
        id: "CUST003",
        name: "Bob Wilson",
        email: "bob@example.com",
        status: "Inactive",
        lastOrder: "2024-02-28",
        totalOrders: 1
    }
];

export const load = async () => {
    return {
        customers: dummyCustomers
    };
}; 
export interface User {
    id: number,
    name: string,
    phone: string,
    gender: string,
    email: string,
    address: {
        city: string,
        street: string
    },
}
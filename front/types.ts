export interface User {
    _id: string,
    id: number | null,
    name: string,
    phone: string,
    gender: string,
    email: string,
    address: {
        city: string,
        street: string
    },
}

export interface Options {
    chart: {
        width: number,
        type: string,
    },
    labels: Array<string>,
    responsive: [
        {
            breakpoint: number,
            options: {
                chart: {
                    width: number,
                },
                legend: {
                    position: string,
                },
            },
        },
    ],
}
interface Store {
    id: string;
    commerce: string;
    cuit: string;
    concepts: number[];
    balance: number;
    active: boolean;
    lastSale: Date;
}

export default Store;

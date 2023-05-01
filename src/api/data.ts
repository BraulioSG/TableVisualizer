import Store from '../store/Store';

let data: Store[] = [];
(() => {
    for (let i = 1; i < 100; i++) {
        data.push({
            id: i.toString(),
            commerce: `test ${i}`,
            active: Math.random() < 0.5,
            cuit: `${Math.ceil(Math.random() * 100)}-${Math.ceil(
                Math.random() * 1000000000
            )}-${Math.ceil(Math.random() * 10)}`,
            balance: Math.round(Math.random() * 10000),
            lastSale: new Date(),
            concepts: [
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
            ],
        });
    }
})();

export default data;

export function duplicate<T>(
    func: (...args: any[]) => T,
    times: number,
    ...args: any[]
): T[] {
    let products = [];
    for (let i = 0; i < times; i++) {
        products.push(func(...args));
    }
    return products;
}

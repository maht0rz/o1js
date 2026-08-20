export let wasm: any;
export const withThreadPool: <T>(run: () => Promise<T>) => Promise<T>;

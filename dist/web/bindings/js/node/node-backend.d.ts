/**
 * @type {import("../../compiled/node_bindings/kimchi_wasm.cjs")}
 */
export const wasm: typeof import("../../compiled/node_bindings/kimchi_wasm.cjs");
export const withThreadPool: <T>(run: () => Promise<T>) => Promise<T>;

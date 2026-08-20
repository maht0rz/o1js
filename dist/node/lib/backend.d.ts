export { getBackendPreference, lockBackend, setBackend };
type Backend = 'wasm' | 'native';
/**
 * Set the backend to use for cryptographic operations such as proving.
 *
 * Must be called **before** `initializeBindings()`. The default backend is `'wasm'`.
 *
 * _Note:_ In browser environments, only the 'wasm' backend is available.
 * Attempting to set the backend to 'native' in such environments will result in a no-op with a console warning.
 *
 * @example
 * ```ts
 * import { setBackend, initializeBindings } from 'o1js';
 *
 * setBackend('native');
 *
 * // must be called after setBackend, most of the o1js functions do this internally
 * await initializeBindings();
 * ```
 */
declare function setBackend(backend: Backend): void;
/**
 * Retrieve the currently set backend preference.
 * @returns The backend preference, either 'wasm' or 'native'.
 */
declare function getBackendPreference(): Backend;
declare function lockBackend(): void;

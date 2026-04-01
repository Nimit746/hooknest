import { useState, useCallback } from "react";

/**
 * Syncs state with `sessionStorage`. Behaves identically to `useLocalStorage`
 * but uses the session-scoped storage (cleared when the tab closes).
 *
 * @param {string} key - The sessionStorage key.
 * @param {*} initialValue - Value to use when the key is absent or on error.
 * @returns {[*, Function, Function]} `[value, set, remove]`
 *   - `set(val)` — updates state and writes to sessionStorage.
 *   - `remove()` — deletes the key and resets to `initialValue`.
 *
 * @example
 * const [token, setToken, removeToken] = useSessionStorage('auth_token', null);
 */
export function useSessionStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const set = useCallback(
        (val) => {
            try {
                setValue(val);
                sessionStorage.setItem(key, JSON.stringify(val));
            } catch {
                // sessionStorage may be unavailable (e.g. private-browsing quota exceeded).
            }
        },
        [key]
    );

    const remove = useCallback(() => {
        try {
            setValue(initialValue);
            sessionStorage.removeItem(key);
        } catch {
            // ignore
        }
    }, [key, initialValue]);

    return [value, set, remove];
}

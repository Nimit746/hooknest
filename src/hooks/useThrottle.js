import { useCallback, useRef } from "react";

/**
 * Returns a throttled version of the provided function that fires at most
 * once per `limit` milliseconds. Unlike debounce, throttle guarantees the
 * function runs on the *leading* edge and then suppresses calls until the
 * interval expires — preventing silent gaps (e.g. scroll handlers).
 *
 * @param {Function} fn - The function to throttle.
 * @param {number} limit - Minimum milliseconds between invocations.
 * @returns {Function} The throttled function. Stable across renders as long
 *   as `fn` and `limit` are stable.
 *
 * @example
 * const throttledFn = useThrottle(fn, 200);
 */
export function useThrottle(fn, limit) {
    const lastCalledRef = useRef(0);
    const timeoutRef = useRef(null);

    return useCallback(
        (...args) => {
            const now = Date.now();
            const remaining = limit - (now - lastCalledRef.current);

            if (remaining <= 0) {
                // Enough time has passed — fire immediately.
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                lastCalledRef.current = now;
                fn(...args);
            } else {
                // Schedule a trailing call so the last invocation is never dropped.
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    lastCalledRef.current = Date.now();
                    timeoutRef.current = null;
                    fn(...args);
                }, remaining);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fn, limit]
    );
}

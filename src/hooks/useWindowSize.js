import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Returns the current window dimensions, debounced to avoid thrashing on
 * rapid resize events.
 *
 * @param {number} [delay=150] - Debounce delay in milliseconds.
 * @returns {{ width: number, height: number }} Current viewport dimensions.
 *
 * @example
 * const { width, height } = useWindowSize();
 * const { width, height } = useWindowSize(300); // custom debounce delay
 */
export function useWindowSize(delay = 150) {
    const getSize = () => ({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    const [size, setSize] = useState(getSize);
    const timeoutRef = useRef(null);

    const handleResize = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setSize(getSize()), delay);
    }, [delay]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [handleResize]);

    return size;
}

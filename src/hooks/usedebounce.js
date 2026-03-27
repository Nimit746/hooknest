import { useState, useEffect, useCallback, useRef } from "react";

export function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value);
    const timeoutRef = useRef(null);

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return cancel;
    }, [value, delay, cancel]);

    return [debounced, cancel];
}
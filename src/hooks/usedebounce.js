import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        let isMounted = true;
        const timer = setTimeout(() => {
            if (isMounted) setDebounced(value);
        }, delay);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debounced;
}
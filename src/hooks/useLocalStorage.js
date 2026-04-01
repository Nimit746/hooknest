import { useState, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const set = useCallback(
        (val) => {
            setValue(val);
            if (typeof window !== "undefined") {
                try {
                    localStorage.setItem(key, JSON.stringify(val));
                } catch {
                    // localStorage may be unavailable (e.g. private-browsing quota exceeded).
                }
            }
        },
        [key]
    );

    const remove = useCallback(() => {
        setValue(initialValue);
        if (typeof window !== "undefined") {
            try {
                localStorage.removeItem(key);
            } catch {
                // ignore
            }
        }
    }, [key, initialValue]);

    return [value, set, remove];
}
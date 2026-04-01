import { useEffect } from "react";

export function useOnClickOutside(refOrRefs, handler) {
    useEffect(() => {
        if (typeof document === "undefined") return;

        const listener = (event) => {
            const refs = Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs];
            const isOutside = refs.every((ref) => {
                return !ref.current || !ref.current.contains(event.target);
            });

            if (isOutside) {
                handler(event);
            }
        };

        document.addEventListener("mousedown", listener, true);
        document.addEventListener("touchstart", listener, true);

        return () => {
            document.removeEventListener("mousedown", listener, true);
            document.removeEventListener("touchstart", listener, true);
        };
    }, [refOrRefs, handler]);
}
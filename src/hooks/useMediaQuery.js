import { useState, useEffect } from "react";

/**
 * Returns whether a CSS media query currently matches.
 *
 * @param {string} query - A valid CSS media query string, e.g. '(max-width: 768px)'.
 * @returns {boolean} `true` while the query matches, `false` otherwise.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export function useMediaQuery(query) {
    const getMatches = () => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState(getMatches);

    useEffect(() => {
        const mql = window.matchMedia(query);
        setMatches(mql.matches);

        const handler = (e) => setMatches(e.matches);

        // Use addEventListener when available (modern browsers), fall back to
        // the deprecated addListener for older environments.
        if (mql.addEventListener) {
            mql.addEventListener("change", handler);
            return () => mql.removeEventListener("change", handler);
        } else {
            mql.addListener(handler);
            return () => mql.removeListener(handler);
        }
    }, [query]);

    return matches;
}

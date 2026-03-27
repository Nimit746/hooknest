import { useState, useCallback } from "react";

export function useToggle(initialValue = false) {
    const [state, setState] = useState(initialValue);

    const toggle = useCallback(() => setState((s) => !s), []);
    const set = useCallback((value) => setState(!!value), []);

    return [state, toggle, set];
}
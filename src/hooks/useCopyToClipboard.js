import { useState, useCallback } from "react";

export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(async (text) => {
        if (!text) return;
        let success = false;

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                success = true;
            } else {
                throw new Error("Clipboard API not available");
            }
        } catch (error) {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                success = document.execCommand("copy");
                document.body.removeChild(textArea);
            } catch (err) {
                console.error("Fallback: Unable to copy", err);
                success = false;
            }
        }

        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, []);

    return { copied, copy };
}
import { useState, useMemo, useEffect } from "react";

export const useInlineMediaQuery = () => {
    const [localWidth, setLocalWidth] = useState(window.screen.width);

    useEffect(() => { setLocalWidth(window.screen.width); }, [window.screen.width])

    return localWidth
}
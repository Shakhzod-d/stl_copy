import { useState, useEffect, useRef } from "react";

export const useOutsideClick = (initialIsVisible: boolean) => {
    const [isVisible, setIsVisible] = useState<boolean>(initialIsVisible);
    const ref = useRef<HTMLElement>(null);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return { ref, isVisible, setIsVisible };
};

export default useOutsideClick;

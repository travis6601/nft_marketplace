import { useState, useRef, useEffect, RefObject } from "react";

function useHover<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // Remove elementRef.current from dependencies as it's a mutable ref

  return [elementRef as RefObject<T>, isHovered];
}

export default useHover;

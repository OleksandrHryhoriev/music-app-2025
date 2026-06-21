import { useEffect } from "react";

// Takes an array of nodeRefs and callback action when clicking outside given nodes
export default function useClickOutside(
   refs: React.RefObject<HTMLElement | null>[],
   callback: () => void,
) {
   useEffect(() => {
      function handleClick(event: MouseEvent) {
         const target = event.target as Node;

         const isInside = refs.some((ref) => ref.current?.contains(target));

         if (!isInside) {
            callback();
         }
      }

      document.addEventListener("mousedown", handleClick);

      return () => {
         document.removeEventListener("mousedown", handleClick);
      };
   }, [refs, callback]);
}

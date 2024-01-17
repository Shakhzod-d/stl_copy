import { useEffect, useRef } from "react";

interface UseScrollToBottomReturnType {
   scrollRef: React.RefObject<HTMLDivElement>;
   scrollToBottom: () => void;
}

function useScrollToBottom(): UseScrollToBottomReturnType {
   const scrollRef = useRef<HTMLDivElement>(null);

   const scrollToBottom = () => {
      if (scrollRef.current) {
         scrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "end",
         });
      }
   };

   return { scrollRef, scrollToBottom };
}

export default useScrollToBottom;

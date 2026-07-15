import { useEffect, useRef } from "react";

interface ContainerBreakpoints {
   [width: number]: number;
}

interface DynamicTextProps {
   text: string;
   minSize?: number;
   maxSize?: number;
   maxLinesWhenMinSize?: number;
   breakpoints?: ContainerBreakpoints;
}

const defaultBreakpoints: ContainerBreakpoints = {
   300: 0.6,
   400: 0.8,
};

export default function DynamicText({
   text,
   minSize = 16,
   maxSize = 36,
   maxLinesWhenMinSize = 2,
   breakpoints = defaultBreakpoints,
}: DynamicTextProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   const textRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const container = containerRef.current;
      const textElement = textRef.current;
      if (!container || !textElement) return;

      const hiddenMeasurer = document.createElement("div");
      hiddenMeasurer.style.position = "absolute";
      hiddenMeasurer.style.visibility = "hidden";
      hiddenMeasurer.style.top = "-9999px";
      hiddenMeasurer.style.left = "-9999px";
      hiddenMeasurer.style.overflowWrap = "normal";
      hiddenMeasurer.style.wordBreak = "normal";
      hiddenMeasurer.style.whiteSpace = "nowrap";
      document.body.appendChild(hiddenMeasurer);

      const resizeObserver = new ResizeObserver((entries) => {
         if (!entries || entries.length === 0) return;
         const containerWidth = entries[0].contentRect.width;
         if (containerWidth <= 0) return;

         let currentMaxSize = maxSize;
         const sortedWidths = Object.keys(breakpoints)
            .map(Number)
            .sort((a, b) => a - b);
         for (const widthThreshold of sortedWidths) {
            if (containerWidth <= widthThreshold) {
               currentMaxSize = Math.round(
                  maxSize * breakpoints[widthThreshold],
               );
               break;
            }
         }

         const computedStyle = window.getComputedStyle(textElement);
         hiddenMeasurer.textContent = text;
         hiddenMeasurer.style.fontFamily = computedStyle.fontFamily;
         hiddenMeasurer.style.fontWeight = computedStyle.fontWeight;
         hiddenMeasurer.style.letterSpacing = computedStyle.letterSpacing;

         hiddenMeasurer.style.fontSize = `${currentMaxSize}px`;
         const fullTextWidth = hiddenMeasurer.scrollWidth;

         const idealSingleLineSize =
            (containerWidth / fullTextWidth) * currentMaxSize;

         if (idealSingleLineSize >= minSize) {
            const safeSize = Math.min(
               currentMaxSize,
               idealSingleLineSize - 0.5,
            );

            textElement.style.fontSize = `${safeSize}px`;
            textElement.style.whiteSpace = "nowrap";
            textElement.style.display = "block";
            textElement.style.webkitLineClamp = "unset";
         } else {
            textElement.style.fontSize = `${minSize}px`;
            textElement.style.whiteSpace = "normal";
            textElement.style.display = "-webkit-box";
            textElement.style.webkitBoxOrient = "vertical";
            textElement.style.webkitLineClamp = `${maxLinesWhenMinSize}`;
         }
      });

      resizeObserver.observe(container);

      return () => {
         resizeObserver.disconnect();
         if (document.body.contains(hiddenMeasurer)) {
            document.body.removeChild(hiddenMeasurer);
         }
      };
   }, [text, minSize, maxSize, maxLinesWhenMinSize, breakpoints]);

   return (
      <div ref={containerRef} className="w-full">
         <div
            ref={textRef}
            className="leading-tight overflow-hidden text-ellipsis overflow-wrap-normal break-normal"
         >
            {text}
         </div>
      </div>
   );
}

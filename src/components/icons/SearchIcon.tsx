import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { title?: string; color?: string };

export default function SearchIcon({
   title = "Search",
   color,
   ...props
}: Props) {
   return (
      <svg
         width="100%"
         height="100%"
         viewBox="0 0 24 24"
         aria-hidden={title ? undefined : true}
         role={title ? "img" : "presentation"}
         {...props}
      >
         {title ? <title>{title}</title> : null}
         <g
            fill={color ? color : "currentColor"}
            stroke={color ? color : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            <circle cx="11" cy="11" r="8" fill="none"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
         </g>
      </svg>
   );
}

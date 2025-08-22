import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & { title?: string };

export default function ExpandIcon({ title = "Expand", ...props }: Props) {
   return (
      <svg
         className="opacity-70 hover:opacity-100"
         width="100%"
         height="100%"
         viewBox="0 0 24 24"
         aria-hidden={title ? undefined : true}
         role={title ? "img" : "presentation"}
         {...props}
      >
         {title ? <title>{title}</title> : null}
         <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            {/* NW arrow in */}
            {/* <path d="M9 5H5v4M8 8L5 5" /> */}
            {/* NE arrow in */}
            <path d="M15 5h4v4M16 8l3-3" />
            {/* SW arrow in */}
            <path d="M9 19H5v-4M8 16l-3 3" />
            {/* SE arrow in */}
            {/* <path d="M15 19h4v-4M16 16l3 3" /> */}
         </g>
      </svg>
   );
}

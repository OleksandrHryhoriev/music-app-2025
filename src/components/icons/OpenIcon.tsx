import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & { title?: string };

export default function OpenIcon({ title = "Open", ...props }: Props) {
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
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <path d="M9 3v18" />
            <path d="M14 9l3 3-3 3" />
         </g>
      </svg>
   );
}

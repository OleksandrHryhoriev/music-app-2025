import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & { title?: string };

export default function LibraryIcon({ title, ...props }: Props) {
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
            <path d="M2 2v20" />
            <path d="M9 2v20" />
            <path d="M16 2v20" />
            <path d="M16 2l6 3-0 17-6 0" />
         </g>
      </svg>
   );
}

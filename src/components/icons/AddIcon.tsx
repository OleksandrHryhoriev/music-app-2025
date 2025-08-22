import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { title?: string };

export default function AddIcon({ title = "Add", ...props }: Props) {
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
            <path d="M12 4v16" />
            <path d="M4 12l16 0" />
         </g>
      </svg>
   );
}

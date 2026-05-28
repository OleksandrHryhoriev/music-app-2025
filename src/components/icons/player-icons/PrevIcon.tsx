import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { title?: string; color?: string };

export default function PrevIcon({
   title = "Previous",
   color,
   ...props
}: Props) {
   return (
      <svg
         width="100%"
         height="100%"
         viewBox="0 0 16 16"
         aria-hidden={title ? undefined : true}
         role={title ? "img" : "presentation"}
         {...props}
      >
         {title ? <title>{title}</title> : null}
         <g
            fill={color ? color : "currentColor"}
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z" />
         </g>
      </svg>
   );
}

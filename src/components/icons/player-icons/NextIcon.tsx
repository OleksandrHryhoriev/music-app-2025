import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { title?: string; color?: string };

export default function NextIcon({ title = "Next", color, ...props }: Props) {
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
            <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
         </g>
      </svg>
   );
}

import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { title?: string; color?: string };

export default function PlayIcon({ title = "Play", color, ...props }: Props) {
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
            stroke={color ? color : "currentColor"}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
         </g>
      </svg>
   );
}

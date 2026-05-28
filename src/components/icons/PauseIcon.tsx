import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { title?: string; color?: string };

export default function PauseIcon({ title = "Pause", color, ...props }: Props) {
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
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
         </g>
      </svg>
   );
}

import * as React from "react";
type Props = React.SVGProps<SVGSVGElement>;

export default function LoadIcon({ ...props }: Props) {
   return (
      <svg
         className="opacity-80"
         width="100%"
         height="100%"
         viewBox="0 0 100 100"
         {...props}
      >
         <g
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            <path d="M 20 26 A 40 40 0 0 1 80 26" />
            <path d="M 70 26 L 80 26 L 80 16" />
            <path d="M 80 74 A 40 40 0 0 1 20 74" />
            <path d="M 30 74 L 20 74 L 20 84" />
         </g>
      </svg>
   );
}

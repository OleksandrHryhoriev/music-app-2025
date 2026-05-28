import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & { color?: string };

export default function LogoIcon({ color }: Props) {
   return (
      <svg
         width="100%"
         height="100%"
         viewBox="0 0 100 100"
         xmlns="http://www.w3.org/2000/svg"
      >
         <g
            fill={color ? color : "#ffb900"}
            stroke={color ? color : "#ffb900"}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            {/* <!-- headband --> */}
            <path d="M17 50 A27 27 0 0 1 83 50 L78 50 A22 22 0 0 0 22 50" />

            {/* <!-- left earcup --> */}
            <rect x="17" y="45" width="18" height="32" rx="5.5" ry="5.5"></rect>

            {/* <!-- right earcup --> */}
            <rect x="65" y="45" width="18" height="32" rx="5.5" ry="5.5"></rect>

            {/* <!-- left outer piece --> */}
            <polygon points="10 58 13 55 13 72 10 70"></polygon>

            {/* <!-- right outer piece --> */}
            <polygon points="90 58 87 55 87 72 90 70" />
         </g>
      </svg>
   );
}

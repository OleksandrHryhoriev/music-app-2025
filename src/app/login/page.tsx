// import Image from "next/image";
import LogoIcon from "@/src/components/icons/LogoIcon";
import Link from "next/link";

export default function LoginPage() {
   return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-(--backgroundMain) ">
         <div className="flex items-center justify-center w-20 h-20 mb-10">
            <LogoIcon />
         </div>
         <h2 className="text-5xl mb-5">LOGIN PAGE</h2>
         <button className="px-5 py-1 rounded-lg cursor-pointer transition duration-200 bg-(--backgroundSecondary) hover:bg-neutral-700">
            <Link href={"/"} className="text-xl">
               Home
            </Link>
         </button>
      </div>
   );
}

import Image from "next/image";
import AuthBlock from "./AuthBlock";

const Header = () => {
   return (
      <header className="flex justify-between items-center px-2.5 pt-2.5">
         <div className="flex items-center justify-center w-10 h-10 relative rounded-full overflow-hidden">
            <Image
               src="/images/android-chrome-512x512.png"
               alt="logo"
               className="object-contain"
               fill
               sizes="30vw"
            />
         </div>
         <AuthBlock />
      </header>
   );
};

export default Header;

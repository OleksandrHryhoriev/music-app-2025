import AuthBlock from "./AuthBlock";
import LogoIcon from "../icons/LogoIcon";

const Header = () => {
   return (
      <header className="flex justify-between items-center p-2">
         <div className="flex items-center justify-center w-12 h-12">
            <LogoIcon />
         </div>
         <AuthBlock />
      </header>
   );
};

export default Header;

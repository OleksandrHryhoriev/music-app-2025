import AuthBlock from "./AuthBlock";
import LogoIcon from "../icons/LogoIcon";
import Search from "../search/Search";

const Header = () => {
   return (
      <header className="flex justify-between items-center gap-1 p-2">
         <div className="h-12 aspect-square">
            <LogoIcon />
         </div>
         <Search />
         <AuthBlock />
      </header>
   );
};

export default Header;

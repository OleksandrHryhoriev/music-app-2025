import { ReactNode } from "react";

type SearchWrapperProps = {
   children: ReactNode;
};

const SearchWrapper = ({ children }: SearchWrapperProps) => {
   return <div className="flex-3/4 min-w-75 max-w-100 h-12">{children}</div>;
};

export default SearchWrapper;

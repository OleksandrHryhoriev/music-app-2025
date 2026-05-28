import MainWrapper from "@/src/components/main/MainWrapper";
import { Suspense } from "react";

export default function MainPageLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="w-full h-full">
         <Suspense fallback={<h2>Loading...</h2>}>
            <MainWrapper>{children}</MainWrapper>
         </Suspense>
      </div>
   );
}

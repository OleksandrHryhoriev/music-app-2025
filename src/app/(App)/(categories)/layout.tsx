import { Suspense } from "react";

export default function MainPageLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return <Suspense fallback={<h2>Loading...</h2>}>{children}</Suspense>;
}

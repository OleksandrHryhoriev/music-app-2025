"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
   return (
      <button
         type="button"
         onClick={() => signOut({ callbackUrl: "/" })}
         className="block w-full p-3 text-left cursor-pointer"
      >
         Sign Out
      </button>
   );
}

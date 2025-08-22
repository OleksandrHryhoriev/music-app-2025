"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
   return (
      <form
         action={async () => {
            await signOut();
         }}
      >
         <button
            type="submit"
            className="auth bg-amber-400 h-8 px-4 rounded-2xl flex items-center cursor-pointer"
         >
            Sign Out
         </button>
      </form>
   );
}

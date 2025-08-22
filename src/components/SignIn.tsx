import { signIn } from "@/auth";

export default function SignIn() {
   return (
      <form
         action={async () => {
            "use server";
            await signIn("spotify");
         }}
      >
         <button
            type="submit"
            className="auth bg-amber-400 h-8 px-4 rounded-2xl flex items-center cursor-pointer"
         >
            Sign in with Spotify
         </button>
      </form>
   );
}

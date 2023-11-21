/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonLogin() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex items-center gap-2">
        <img
          className="h-12 w-12 rounded-full"
          src={session.user?.image ?? ""}
          alt="profile image"
        />
        <button
          onClick={() => signOut()}
          className="btn btn-outline btn-error "
        >
          <span className="text-white">Sign-Out</span>
        </button>
      </div>
    );
  }
  return (
    <>
      <button onClick={() => signIn()} className=" btn btn-outline btn-info">
        Sign-In
      </button>
    </>
  );
}

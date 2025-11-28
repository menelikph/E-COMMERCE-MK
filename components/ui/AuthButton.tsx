"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButton({ isMobile = false }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-gray-400 animate-pulse">Cargando...</p>;
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 cursor-pointer
                   text-white rounded-md shadow-md transition 
                   hover:scale-105"
      >
        Login
      </button>
    );
  }

  return (
    <div className="flex items-center gap-5 bg-gray-800 px-3 py-1.5 rounded-full">
      <Image
        src={session.user?.image || "/default-avatar.png"}
        width={32}
        height={32}
        alt="avatar"
        className="rounded-full border border-purple-500"
      />
      {isMobile && (
        <span className="text-sm font-medium text-gray-200">
          {session.user?.name?.split(" ")[0]}
        </span>
      )}

      <button
        onClick={() => signOut()}
        className="px-3 py-1 bg-purple-500 hover:bg-purple-400 cursor-pointer
                   text-white rounded-md text-xs transition"
      >
        Logouth
      </button>
    </div>
  );
}

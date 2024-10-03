'use client'
import Login from "@/components/authModal/Login";
import Logout from "@/components/logout/Logout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <>
          <Logout />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

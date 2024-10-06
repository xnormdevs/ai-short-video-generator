"use client";
import Login from "@/components/authModal/Login";
import Logout from "@/components/logout/Logout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();
  // console.log(session?.user, status);

  return (
    <div className="flex items-center justify-between shadow-md h-16 mb-2 py-2 px-10 fixed w-full">
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-xl font-bold flex items-center">
            <Image
              src="/logo.png"
              alt="Invoice Generator logo"
              width={100}
              height={100}
            />
            <h2 className="ml-2 text-base text-gray-800">AI Short vid</h2>
          </div>
        </Link>
        <div className="flex items-center"></div>
        {status === "authenticated" ? (
          <>
            <Logout />
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Header;

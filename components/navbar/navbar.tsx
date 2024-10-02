"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import Login from "../authModal/Login";
import Logout from "../logout/Logout";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session, status);

  return (
    <nav className="flex items-center justify-between bg-gray-800 h-12 mb-8 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-xl font-bold">
            <Image
              src="/logo.png"
              alt="Invoice Generator logo"
              width={100}
              height={100}
            />
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
    </nav>
  );
};

export default Navbar;

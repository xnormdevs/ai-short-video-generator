"use client";
import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import Login from "@/components/authModal/Login";
import Logout from "@/components/logout/Logout";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const { userDetails }:any = useContext(UserDetailsContext);
  console.log(userDetails);

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

        {status === "authenticated" ? (
          <>
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <Image src='/coin.png' alt='coin' width={30} height={30} className='mr-2'/>
                <h2>{userDetails?.credits}</h2>
              </div>
              <Link href='/dashboard'>
                <Button className="mr-5">Dashboard</Button>
              </Link>
              <Logout />
            </div>
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Header;

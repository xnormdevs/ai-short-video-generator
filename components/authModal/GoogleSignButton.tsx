'use client'
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const GoogleSignButton = () => {
  const handleClick = () => {
    signIn("google");
  };
  return (
    <div>
      <Button
        className="w-full font-bold border-2 border-white rounded-xl text-md shadow-md hover:shadow-xl"
        onClick={handleClick}
        variant={'white'}
      >
        <Image
          src="https://img.icons8.com/fluency/48/000000/google-logo.png"
          alt="Google"
          width={24}
          height={24}
          className="mr-2"
        />
        Continue with Google
      </Button>
    </div>
  );
};

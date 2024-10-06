"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { GoogleSignButton } from "./GoogleSignButton";

const Login = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-center text-gray-400">Find Mystery Today</DialogTitle>
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={150}
          className="mx-auto"
        />
        <DialogDescription className="text-sm text-center text-gray-400">
          Invoice Magic at Zero Cost
        </DialogDescription>

        <GoogleSignButton />
      </DialogContent>
    </Dialog>
  );
};

export default Login;

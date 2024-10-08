"use client";
import Login from "@/components/authModal/Login";
import Logout from "@/components/logout/Logout";
import { useSession } from "next-auth/react";
import Header from "./dashboard/_components/Header";

export default function Home() {
  const { data: session, status } = useSession();
  return <>HOME</>;
}

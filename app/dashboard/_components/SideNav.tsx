'use client'
import React from "react";
import {
  CircleUser,
  FileVideo,
  LucideProps,
  PanelsTopLeft,
  ShieldPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export interface IMenuOptions {
  id: number;
  name: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}
const MenuOptions: IMenuOptions[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: PanelsTopLeft,
  },
  {
    id: 2,
    name: "Create New",
    path: "/dashboard/create-new",
    icon: FileVideo,
  },
  {
    id: 3,
    name: "Upgrade",
    path: "/upgrade",
    icon: ShieldPlus,
  },
  {
    id: 4,
    name: "Account",
    path: "/account",
    icon: CircleUser,
  },
];
const SideNav = () => {
  const path = usePathname();
  console.log(path);
  return (
    <div className="w-full h-screen px-5 pt-20 shadow-md">
      <div className="grid gap-2">
        {MenuOptions.map((item, i) => (
          <Link href={item.path} key={i}>
            <div
              key={i}
              className={`flex items-center gap-3 p-3 hover:bg-primary hover:text-white cursor-pointer rounded-md ${path === item.path ? "bg-primary text-white" : ""}`}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

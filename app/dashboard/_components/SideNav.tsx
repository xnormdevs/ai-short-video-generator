import React from "react";
import {
  CircleUser,
  FileVideo,
  LucideProps,
  PanelsTopLeft,
  ShieldPlus,
} from "lucide-react";
export interface IMenuOptions {
  id: number;
  name: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

const SideNav = () => {
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
      path: "/create-new",
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
  return (
    <div className="w-full h-screen px-5 shadow-md">
      <div className="grid gap-2">
        {MenuOptions.map((item, i) => (
          <div className="flex items-center gap-3 p-3 hover:bg-primary hover:text-white cursor-pointer">
            <item.icon />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

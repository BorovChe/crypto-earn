import { ReactNode } from "react";

import SideBar from "@/components/layout/SideBar";

interface IActivityLayoutProps {
  children: ReactNode;
}

const ActivityLayout = ({ children }: IActivityLayoutProps) => {
  return (
    <div className="flex relative">
      <SideBar />
      <section>{children}</section>
    </div>
  );
};

export default ActivityLayout;

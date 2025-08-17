import SideBar from "@/components/layout/SideBar";

const ActivityLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      <section>{children}</section>
    </div>
  );
};

export default ActivityLayout;

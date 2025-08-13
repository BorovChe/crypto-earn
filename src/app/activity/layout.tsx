import SideBar from "@/components/activity/side-bar/SideBar";

const ActivityLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      <section>{children}</section>
    </div>
  );
};

export default ActivityLayout;

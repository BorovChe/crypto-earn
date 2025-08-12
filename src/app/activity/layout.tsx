import SideBar from "@/components/activity/side-bar/SideBar";

const ActivityLayout = ({ children }) => {
  return (
    <>
      <SideBar />
      <section>{children}</section>
    </>
  );
};

export default ActivityLayout;

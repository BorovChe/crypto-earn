import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
}

const Container = ({ children }: IContainerProps) => {
  return <div className="container 2xl mx-auto px-5 sm:px-8  ">{children}</div>;
};

export default Container;

"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ReactNode } from "react";

interface IReduxProvider {
  children: ReactNode;
}
const ReduxProvider = ({ children }: IReduxProvider) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

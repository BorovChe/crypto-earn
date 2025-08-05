import { ComponentType } from "react";

export interface IOrderBook {
  ticker: string;
  exchanges: ComponentType<{ ticker: string }>[];
}

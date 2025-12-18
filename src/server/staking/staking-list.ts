import { getBinanceStaking } from "./adapters/binance";
import { sortStakingList } from "./sort";
import serverPagination from "./pagination";

import { IStakingParams } from "../types";
import { IStakingData, IStakingList } from "@/types/staking";

export const getStakingList = async (
  params: IStakingParams,
  pageSize: number
): Promise<IStakingData> => {
  const { page, sort } = params;

  const results = await Promise.allSettled<IStakingList[] | null>([
    getBinanceStaking(),
  ]);

  const list = results.flatMap((r) =>
    r.status === "fulfilled" && r.value ? r.value : []
  );

  const sortedList = sortStakingList(list, sort);

  const { totalPages, start, end } = serverPagination(
    sortedList.length,
    page,
    pageSize
  );

  return {
    totalPages,
    page,
    list: sortedList.slice(start, end) || [],
  };
};

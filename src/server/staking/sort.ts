import { IStakingList } from "@/types/staking";

interface ISortFunc {
  [key: string]: (a: IStakingList, b: IStakingList) => number;
}

const sortFunctions: ISortFunc = {
  coin_asc: (a, b) => a.coin.localeCompare(b.coin),
  coin_desc: (a, b) => b.coin.localeCompare(a.coin),
  exchange_asc: (a, b) => b.exchange.title.localeCompare(a.exchange.title),
  exchange_desc: (a, b) => a.exchange.title.localeCompare(b.exchange.title),
  apr_asc: (a, b) => b.apy[0] - a.apy[0],
  apr_desc: (a, b) => a.apy[0] - b.apy[0],
};

export const sortStakingList = (
  list: IStakingList[],
  sort: string
): IStakingList[] => {
  const sortFn = sortFunctions[sort] ?? (() => 0);
  return [...list].sort(sortFn);
};

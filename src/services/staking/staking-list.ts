// import { getBybitStaking } from "./bybit";
import { getBinanceStaking } from "./binance";
// import { getMexcStaking } from "./mexc";
// import { getBitgetStaking } from "./bitget";
// import { getGateStaking } from "./gate";
// import { getHuobiStaking } from "./huobi";
// import { getKukoinStaking } from "./kukoin";
// import { getOkxStaking } from "./okx";

import { StakingData, StakingList } from "@/interfaces/staking";

export const getStakingList = async (
  page: number = 1,
  pageSize: number = 5
): Promise<StakingData | null> => {
  const responses = await Promise.allSettled<StakingList[] | null>([
    // getBybitStaking(),
    // getMexcStaking(),
    getBinanceStaking(),
    // getBitgetStaking(),
    // getGateStaking(),
    // getHuobiStaking(),
    // getKukoinStaking(),
    // getOkxStaking(),
  ]);

  const list = responses
    .filter(
      (r): r is PromiseFulfilledResult<StakingList[]> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value)
    .flat();
  console.log(list);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const totalPages = Math.ceil(list.length / pageSize);

  return {
    totalPages,
    page,
    list: list.slice(start, end),
  };
};

import { getBybitStaking } from "./bybit";
import { getBinanceStaking } from "./binance";
import { getMexcStaking } from "./mexc";
import { getBitgetStaking } from "./bitget";
import { getGateStaking } from "./gate";
import { getHuobiStaking } from "./huobi";
import { getKukoinStaking } from "./kukoin";
import { getOkxStaking } from "./okx";

import { StakingData } from "@/interfaces/staking";

export const getStakingList = async (): Promise<StakingData[]> => {
  const responses = await Promise.allSettled<StakingData | null>([
    getBybitStaking(),
    getMexcStaking(),
    getBinanceStaking(),
    getBitgetStaking(),
    getGateStaking(),
    getHuobiStaking(),
    getKukoinStaking(),
    getOkxStaking(),
  ]);

  const list = responses
    .filter(
      (r): r is PromiseFulfilledResult<StakingData> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value);

  return list;
};

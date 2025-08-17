import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { StakingList } from "@/interfaces/staking";

interface GateApiResponse {
  data: {
    list: { max_year_rate: number }[];
  };
}

export const getGateStaking = async (): Promise<StakingList | null> => {
  try {
    const data = await safeFetch<GateApiResponse>(
      `${API_EXCHANGES_BASE_URLS.GATE}/apiw/v2/uni-loan/earn/market/list?search_coin=USDT&page=1&limit=1`
    );

    const stakingData = data?.data?.list?.[0];

    const apy: string = stakingData.max_year_rate * 100 + "%";

    return {
      coin: "USDT",
      apy,
      type: "flexible",
      exchange: {
        title: "Gate",
        link: "https://www.gate.com/uk/simple-earn",
      },
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { LaunchpoolData } from "@/interfaces/launchpool";

interface GateAPIResponse {
  data: {
    list: {
      coin: string;
      icon: string;
      real_end_timest: number;
      reward_pools: { coin: string; rate_year: string | number }[];
    }[];
  };
}

export const getGateLaunchpool = async (): Promise<LaunchpoolData[] | null> => {
  try {
    const data = await safeFetch<GateAPIResponse>(
      `${API_EXCHANGES_BASE_URLS.GATE}/apiw/v2/earn/launch-pool/project-list?page=1&pageSize=6&status=1`
    );

    const launchpoolData = data?.data?.list;

    const updatedData = launchpoolData.map((item) => {
      const unixDate = new Date(1000 * item.real_end_timest);
      const endTime = unixDate.toLocaleString();

      const rewardsPool = item.reward_pools.map((rewards) => {
        return {
          coin: rewards.coin,
          apr: rewards.rate_year + "%",
        };
      });

      return {
        coin: item.coin,
        icon: item.icon,
        endTime,
        rewardsPool,
        exchange: {
          title: "Gate",
          link: "https://www.gate.com/uk/launchpool",
        },
      };
    });

    return updatedData;
  } catch (err) {
    console.error(err);
    return null;
  }
};

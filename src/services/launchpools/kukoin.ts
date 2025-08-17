import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { LaunchpoolData } from "@/interfaces/launchpool";

interface KukoinAPIResponse {
  data: {
    gemNewPool: {
      details: {
        endActivity: number;
        poolInfoList: { annualPercentageRate: number; stakingToken: string }[];
        shortName: string;
        logoUrl: string;
      }[];
    };
  };
}

export const getKukoinLaunchpool = async (): Promise<
  LaunchpoolData[] | null
> => {
  try {
    const data = await safeFetch<KukoinAPIResponse>(
      `${API_EXCHANGES_BASE_URLS.KUKOIN}/_api/currency-front/gem/customer/ongoingGem?lang=uk_UA`
    );

    const stakingData = data?.data?.gemNewPool?.details;

    const updatedData = stakingData.map((item) => {
      const unixDate = new Date(1000 * item.endActivity);
      const endTime = unixDate.toLocaleString();

      const rewardsPool = item.poolInfoList.map((rewards) => {
        const multiply = rewards.annualPercentageRate * 100;
        const rounded: number = Math.round(multiply * 100) / 100;
        const apr = rounded + "%";

        return {
          coin: rewards.stakingToken,
          apr,
        };
      });

      return {
        coin: item.shortName,
        icon: item.logoUrl,
        endTime,
        rewardsPool,
        exchange: {
          title: "Kukoin",
          link: "https://www.kucoin.com/uk/gemspace/ongoing",
        },
      };
    });

    return updatedData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

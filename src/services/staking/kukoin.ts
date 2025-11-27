import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { StakingList } from "@/interfaces/staking";

interface KukoinApiResponse {
  data: {
    products: { products: { apr: number } }[];
  };
}

export const getKukoinStaking = async (): Promise<StakingList[] | null> => {
  try {
    const data = await safeFetch<KukoinApiResponse>(
      `${API_EXCHANGES_BASE_URLS.KUKOIN}/_pxapi/pool-staking/v3/products/search?lang=uk_UA`
    );

    const stakingData = data?.data?.products?.[0].products?.[12];

    const rounded: number = Math.round(stakingData.apr * 100) / 100;

    const apy: string = rounded + "%";

    return [
      {
        coin: "USDT",
        apy,
        logoUrl: "/icons/coins/dummy.svg",
        type: "flexible",
        exchange: {
          title: "Kukoin",
          link: "https://www.gate.com/uk/simple-earn",
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return null;
  }
};

import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { StakingData } from "@/interfaces/staking";

interface BybitApiResponse {
  result: {
    coin_products: { saving_products: { coin: string; apy: string } };
  };
}

export const getBybitStaking = async (): Promise<StakingData | null> => {
  try {
    const data = await safeFetch<BybitApiResponse>(
      `${API_EXCHANGES_BASE_URLS.BYBIT}/x-api/s1/byfi/get-easy-earn-product-list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
          Origin: "https://www.bybit.com",
        },
        body: JSON.stringify({
          tab: "0",
          page: 1,
          limit: 10,
          fuzzy_coin_name: "USDT",
          sort_type: 0,
          fixed_saving_version: 1,
        }),
      }
    );

    const stakingData = data?.result?.coin_products[0].saving_products[0];

    const apy: string = stakingData.apy;

    return {
      coin: "USDT",
      apy,
      type: "flexible",
      exchange: {
        title: "Bybit",
        link: "https://www.bybit.com/uk-UA/earn/easy-earn/?search=USDT&type=4&id=1&coin=5?ref=WR6KD8",
      },
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

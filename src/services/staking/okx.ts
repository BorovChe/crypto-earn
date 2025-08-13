import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { StakingData } from "@/interfaces/staking";

interface OkxApiResponse {
  data: {
    allProducts: {
      currencies: { products: { rate: { rateNum: { value: string } } }[] }[];
    };
  };
}

export const getOkxStaking = async (): Promise<StakingData | null> => {
  try {
    const data = await safeFetch<OkxApiResponse>(
      `${API_EXCHANGES_BASE_URLS.OKX}/priapi/v1/earn/simple-earn/all-products?limit=8&type=all&t=1754411653363`
    );

    const stakingData =
      data.data.allProducts.currencies[0].products[0].rate.rateNum;

    const apy: string = stakingData.value[0] + "%";

    return {
      coin: "USDT",
      apy,
      type: "flexible",
      exchange: {
        title: "Okx",
        link: "https://www.okx.com/ru/earn/simple-earn",
      },
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

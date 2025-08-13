import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { StakingData } from "@/interfaces/staking";

interface BinanceApiResponse {
  data: {
    list: {
      asset: string;
      apyRange: [number, number];
    }[];
  };
}

export const getBinanceStaking = async (): Promise<StakingData | null> => {
  try {
    const data = await safeFetch<BinanceApiResponse>(
      `${API_EXCHANGES_BASE_URLS.BINANCE}/bapi/earn/v1/friendly/finance-earn/simple-earn/homepage/details?requestSource=WEB&pageIndex=1&pageSize=10&includeEthStaking=true&includeSolStaking=true&includeP2pLoan=true&simpleEarnType=ALL`
    );

    const stakingData = data?.data?.list?.find((item) => item.asset === "USDT");

    const rounded: number = Math.round(stakingData!.apyRange[1] * 100);
    const apy: string = rounded + "%";

    return {
      coin: "USDT",
      apy,
      type: "flexible",
      exchange: {
        title: "Binance",
        link: "https://www.binance.com/ru-UA/earn/simple-earn",
      },
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

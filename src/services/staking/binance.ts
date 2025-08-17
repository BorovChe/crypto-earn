import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { StakingList } from "@/interfaces/staking";

interface BinanceApiResponse {
  data: {
    list: {
      asset: string;
      apyRange: [number, number];
    }[];
  };
}

interface BinanceIconsApiResponse {
  data: { assetCode: string; logoUrl: string }[];
}

export const getBinanceStaking = async (): Promise<StakingList[] | null> => {
  try {
    const data = await safeFetch<BinanceApiResponse>(
      `${API_EXCHANGES_BASE_URLS.BINANCE}/bapi/earn/v1/friendly/finance-earn/simple-earn/homepage/details?requestSource=WEB&pageIndex=1&pageSize=400&includeEthStaking=true&includeSolStaking=true&includeP2pLoan=true&simpleEarnType=ALL`
    );

    const assets = await safeFetch<BinanceIconsApiResponse>(
      `${API_EXCHANGES_BASE_URLS.BINANCE}/bapi/asset/v2/public/asset/asset/get-all-asset`
    );

    const stakingList = data?.data?.list?.reduce<StakingList[]>((acc, item) => {
      const multiply = item!.apyRange[0] * 100;
      const rounded: number = Math.round(multiply * 100) / 100;
      const apy: string = rounded + "%";

      if (rounded < 2) return acc;

      const asset = assets.data.find((icon) => icon.assetCode == item.asset);

      acc.push({
        coin: item.asset,
        apy,
        logoUrl: asset?.logoUrl || "/icons/coins/dummy.svg",
        type: "flexible",
        exchange: {
          title: "Binance",
          link: "https://www.binance.com/ru-UA/earn/simple-earn",
        },
      });

      return acc;
    }, []);

    return stakingList;
  } catch (err) {
    console.error(err);
    return null;
  }
};

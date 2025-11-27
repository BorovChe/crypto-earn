import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { StakingList } from "@/interfaces/staking";

interface HuobiApiResponse {
  data: {
    data: { viewYearRate: number }[];
  };
}

export const getHuobiStaking = async (): Promise<StakingList[] | null> => {
  try {
    const data = await safeFetch<HuobiApiResponse>(
      `${API_EXCHANGES_BASE_URLS.HUOBI}/-/x/hbg/v4/saving/mining/project/queryYbbList?page=1&holdCurrency=0&r=m900pr&x-b3-traceid=71c122a297957ca3fd80fbd03105990a`
    );

    const stakingData = data?.data?.[3];

    const apy: string = stakingData.viewYearRate * 100 + "%";

    return [
      {
        coin: "USDT",
        apy,
        logoUrl: "/icons/coins/dummy.svg",
        type: "flexible",
        exchange: {
          title: "Huobi",
          link: "https://www.htx.com/ru-ru/financial/earn/?type=limit&currentProjectType=5",
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return null;
  }
};

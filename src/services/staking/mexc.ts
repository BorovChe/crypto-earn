import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/api";

import { StakingList } from "@/interfaces/staking";

interface MexcApiResponse {
  data: {
    holdPosList: { maxStepRate: number }[];
  };
}

export const getMexcStaking = async (): Promise<StakingList[] | null> => {
  try {
    const data = await safeFetch<MexcApiResponse>(
      `${API_EXCHANGES_BASE_URLS.MEXC}/api/operateactivity/staking?currency=USDT`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
          Accept: "application/json",
          Origin: "https://www.mexc.com",
          Referer: "https://www.mexc.com/",
        },
      }
    );

    const stakingData = data?.data[1]?.holdPosList?.[0];

    const apy: string = stakingData.maxStepRate * 100 + "%";

    return [
      {
        coin: "USDT",
        apy,
        logoUrl: "/icons/coins/dummy.svg",
        type: "flexible",
        exchange: {
          title: "Mexc",
          link: "https://www.mexc.com/uk-UA/staking",
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return null;
  }
};

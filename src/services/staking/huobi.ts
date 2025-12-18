// import { safeFetch } from "@/tools/safeFetch";
// import { API_EXCHANGES_BASE_URLS } from "@/config/base-exchange-urls";

import { IStakingList } from "@/types/staking";

// interface HuobiApiResponse {
//   data: {
//     data: { viewYearRate: number }[];
//   };
// }

export const getHuobiStaking = async (): Promise<IStakingList[] | null> => {
  try {
    // const data = await safeFetch<HuobiApiResponse>(
    //   `${API_EXCHANGES_BASE_URLS.HUOBI}/-/x/hbg/v4/saving/mining/project/queryYbbList?page=1&holdCurrency=0&r=m900pr&x-b3-traceid=71c122a297957ca3fd80fbd03105990a`
    // );

    // const stakingData = data?.data?.[3];

    // const apy: string = stakingData.viewYearRate * 100 + "%";

    return [
      {
        coin: "USDT",
        apy: [1],
        logoUrl: "/icons/coins/dummy.svg",
        flexibleType: false,
        fixedType: false,
        productDetailList: [],
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

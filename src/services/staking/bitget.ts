// import { safeFetch } from "@/tools/safeFetch";
// import { API_EXCHANGES_BASE_URLS } from "@/config/base-exchange-urls";

import { IStakingList } from "@/types/staking";

// interface BitgetApiResponse {
//   data: {
//     bizLineProductList: {
//       productList: {
//         maxApy: number;
//       }[];
//     }[];
//   }[];
// }

export const getBitgetStaking = async (): Promise<IStakingList[] | null> => {
  try {
    // const data = await safeFetch<BitgetApiResponse>(
    //   `${API_EXCHANGES_BASE_URLS.BITGET}/v1/finance/savings/product/list`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "User-Agent":
    //         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    //       "Content-Type": "application/json",
    //       Origin: "https://www.bitget.com",
    //       Referer:
    //         "https://www.bitget.com/ru/earning/savings?source1=earn&source2=savings",
    //     },
    //     body: JSON.stringify({
    //       // coinName: "USDT",
    //       locale: "ru",
    //       matchUserAssets: false,
    //       matchVipProduct: false,
    //       savingsReq: true,
    //       searchObj: {},
    //     }),
    //   }
    // );

    // const stakingData =
    //   data?.data?.[0]?.bizLineProductList[0]?.productList?.[0];

    // const apy: string = stakingData!.maxApy + "%";

    // console.log(stakingData);

    return [
      {
        coin: "USDT",
        apy: [1],
        logoUrl: "/icons/coins/dummy.svg",
        flexibleType: false,
        fixedType: false,
        productDetailList: [],
        exchange: {
          title: "Bitget",
          link: "https://www.bitget.com/ru/earning",
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return null;
  }
};

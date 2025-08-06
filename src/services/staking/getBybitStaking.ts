import { IStakingData } from "@/interfaces/staking";

export async function getBybitStaking() {
  try {
    const res = await fetch(
      "https://www.bybit.com/x-api/s1/byfi/get-easy-earn-product-list",
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

    const data = await res.json();

    const stakingData = data.result.coin_products[0].saving_products[0];

    const apy = stakingData.apy;

    const updatedData: IStakingData = {
      coin: "USDT",
      apy,
      type: "flexible",
      exchange: {
        title: "Bybit",
        link: "https://www.bybit.com/uk-UA/earn/easy-earn/?search=USDT&type=4&id=1&coin=5?ref=WR6KD8",
      },
    };

    return updatedData;
  } catch (error: unknown) {
    console.log(error);
    // return null;
    throw new Error("Failed to fetch staking data");
  }
}

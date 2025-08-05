import axios from "axios";

export async function getBybitStaking() {
  try {
    const response = await axios({
      method: "post",
      url: "https://www.bybit.com/x-api/s1/byfi/get-easy-earn-product-list",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        Origin: "https://www.bybit.com",
      },
      data: {
        tab: "0",
        page: 1,
        limit: 10,
        fuzzy_coin_name: "USDT",
        sort_type: 0,
        fixed_saving_version: 1,
      },
    });

    const data = response.data?.result.coin_products[0].saving_products[0];

    const updatedData = {
      coin: "USDT",
      apy: data.apy,
      type: "flexible",
      exchange: {
        title: "Bybit",
        link: "https://www.bybit.com/uk-UA/earn/easy-earn/?search=USDT&type=4&id=1&coin=5?ref=WR6KD8",
      },
    };

    return updatedData;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Failed to fetch staking data");
  }
}

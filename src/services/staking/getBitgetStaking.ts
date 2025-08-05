import axios from "axios";

export async function getBitgetStaking() {
  try {
    const response = await axios({
      method: "post",
      url: "https://www.bitget.com/v1/finance/savings/product/list",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "Content-Type": "application/json",
        Origin: "https://www.bitget.com",
        Referer:
          "https://www.bitget.com/ru/earning/savings?source1=earn&source2=savings",
      },
      data: {
        coinName: "USDT",
        locale: "ru",
        matchUserAssets: false,
        matchVipProduct: false,
        savingsReq: true,
        searchObj: {},
      },
    });

    const data = response.data.data[0].bizLineProductList[0].productList[0];

    const updatedData = {
      coin: "USDT",
      apy: data.maxApy + "%",
      type: "flexible",
      exchange: {
        title: "Mexc",
        link: "https://www.mexc.com/uk-UA/staking",
      },
    };

    return updatedData;
  } catch (error: unknown) {
    console.log(error);
    // console.error("Ошибка запроса к MEXC:", error?.message || error);
    return [];
  }
}

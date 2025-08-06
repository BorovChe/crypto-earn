export async function getBitgetStaking() {
  try {
    const res = await fetch(
      "https://www.bitget.com/v1/finance/savings/product/list",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
          "Content-Type": "application/json",
          Origin: "https://www.bitget.com",
          Referer:
            "https://www.bitget.com/ru/earning/savings?source1=earn&source2=savings",
        },
        body: JSON.stringify({
          coinName: "USDT",
          locale: "ru",
          matchUserAssets: false,
          matchVipProduct: false,
          savingsReq: true,
          searchObj: {},
        }),
      }
    );

    const data = await res.json();

    const stakingData = data.data[0].bizLineProductList[0].productList[0];

    const apy = stakingData.maxApy + "%";

    const updatedData = {
      coin: "USDT",
      apy,
      type: "flexible",
      exchange: {
        title: "Bitget",
        link: "https://www.bitget.com/ru/earning",
      },
    };

    return updatedData;
  } catch (error) {
    console.log(error);
    throw new Error("Error");
    // console.error("Ошибка запроса к MEXC:", error?.message || error);
  }
}

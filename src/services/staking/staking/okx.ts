export async function getOkxStaking() {
  try {
    const res = await fetch(
      "https://www.okx.com/priapi/v1/earn/simple-earn/all-products?limit=8&type=all&t=1754411653363"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch staking data: ${res.status}`);
    }

    const data = await res.json();

    const stakingData =
      data.data.allProducts.currencies[0].products[0].rate.rateNum;

    const apy = stakingData.value[0];

    const updatedData = {
      coin: "USDT",
      apy: apy + "%",
      type: "flexible",
      exchange: {
        title: "Okx",
        link: "https://www.okx.com/ru/earn/simple-earn",
      },
    };

    return updatedData;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}

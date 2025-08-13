export async function getBybitTokenSplash() {
  try {
    const res = await fetch(
      "https://www.bybit.com/x-api/spot/api/deposit-activity/v2/project/ongoing/projectList",
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
          Origin: "https://www.bybit.com",
        },
      }
    );

    if (!res.ok) throw new Error(`Bybit fetch error: ${res.status}`);

    const data = await res.json();

    // const stakingData = data.result.coin_products[0].saving_products[0];

    // const apy = stakingData.apy;

    // const updatedData = {
    //   coin: "USDT",
    //   apy,
    //   type: "flexible",
    //   exchange: {
    //     title: "Bybit",
    //     link: "https://www.bybit.com/uk-UA/earn/easy-earn/?search=USDT&type=4&id=1&coin=5?ref=WR6KD8",
    //   },
    // };

    return data;
  } catch (e) {
    console.error("Bybit fetch error:", e);
    return null;
  }
}

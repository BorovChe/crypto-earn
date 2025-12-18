export async function getBinanceStaking() {
  try {
    const res = await fetch(
      "https://www.binance.com/bapi/earn/v1/friendly/finance-earn/simple-earn/homepage/details?requestSource=WEB&pageIndex=1&pageSize=10&includeEthStaking=true&includeSolStaking=true&includeP2pLoan=true&simpleEarnType=ALL"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch staking data: ${res.status}`);
    }

    // const data = await res.json();

    // const stakingData = data.data.list.find((item) => item.asset === "USDT");

    // const rounded = Math.round(stakingData.apyRange[1] * 100);
    // const apy = rounded + "%";

    const updatedData = {
      coin: "USDT",
      apy: "any",
      type: "flexible",
      exchange: {
        title: "Binance",
        link: "https://www.binance.com/ru-UA/earn/simple-earn",
      },
    };

    return updatedData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

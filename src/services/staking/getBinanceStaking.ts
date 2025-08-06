import { IStakingData } from "@/interfaces/staking";

export async function getBinanceStaking() {
  try {
    const res = await fetch(
      "https://www.binance.com/bapi/earn/v1/friendly/finance-earn/simple-earn/homepage/details?requestSource=WEB&pageIndex=1&pageSize=10&includeEthStaking=true&includeSolStaking=true&includeP2pLoan=true&simpleEarnType=ALL"
    );

    const data = await res.json();

    const stakingData = data.data.list[2];
    const rounded = Math.round(stakingData.apyRange[1] * 100);
    const apy = rounded + "%";

    const updatedData: IStakingData = {
      coin: "USDT",
      apy,
      type: "flexible",
      exchange: {
        title: "Binance",
        link: "https://www.binance.com/ru-UA/earn/simple-earn",
      },
    };

    return updatedData;
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
}

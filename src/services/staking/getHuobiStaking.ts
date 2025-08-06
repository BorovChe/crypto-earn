export async function getHuobiStaking() {
  try {
    const res = await fetch(
      "https://www.htx.com/-/x/hbg/v4/saving/mining/project/queryYbbList?page=1&holdCurrency=0&r=m900pr&x-b3-traceid=71c122a297957ca3fd80fbd03105990a"
    );

    const data = await res.json();

    const stakingData = data.data[3];

    const apy = stakingData.viewYearRate * 100;

    const updatedData = {
      coin: "USDT",
      apy: apy + "%",
      type: "flexible",
      exchange: {
        title: "Huobi",
        link: "https://www.htx.com/ru-ru/financial/earn/?type=limit&currentProjectType=5",
      },
    };

    return updatedData;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Error");
  }
}

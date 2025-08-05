import axios from "axios";

export async function getMexcStaking() {
  try {
    const response = await axios(
      "https://www.mexc.com/api/operateactivity/staking?currency=USDT",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
          Accept: "application/json",
          Origin: "https://www.mexc.com",
          Referer: "https://www.mexc.com/",
        },
      }
    );

    const data = response?.data?.data[1]?.holdPosList[0];

    const apy = data.maxStepRate * 100;

    const updatedData = {
      coin: "USDT",
      apy: apy + "%",
      type: "flexible",
      exchange: {
        title: "Mexc",
        link: "https://www.mexc.com/uk-UA/staking",
      },
    };

    return updatedData;
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
}

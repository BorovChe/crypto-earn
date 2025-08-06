export async function getMexcStaking() {
  try {
    const res = await fetch(
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

    if (!res.ok) {
      throw new Error(`Failed to fetch staking data: ${res.status}`);
    }

    const data = await res.json();

    const stakingData = data?.data[1]?.holdPosList[0];

    const apy = stakingData.maxStepRate * 100;

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
    return null;
  }
}

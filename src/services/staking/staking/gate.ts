export async function getGateStaking() {
  try {
    const res = await fetch(
      "https://www.gate.com/apiw/v2/uni-loan/earn/market/list?search_coin=USDT&page=1&limit=1"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch staking data: ${res.status}`);
    }

    const data = await res.json();

    const stakingData = data.data.list[0];

    const apy = stakingData.max_year_rate * 100;

    const updatedData = {
      coin: "USDT",
      apy: apy + "%",
      type: "flexible",
      exchange: {
        title: "Gate",
        link: "https://www.gate.com/uk/simple-earn",
      },
    };

    return updatedData;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}

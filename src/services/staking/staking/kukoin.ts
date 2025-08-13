export async function getKukoinStaking() {
  try {
    const res = await fetch(
      "https://www.kucoin.com/_pxapi/pool-staking/v3/products/search?lang=uk_UA"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch staking data: ${res.status}`);
    }

    const data = await res.json();

    const stakingData = data.data.products[0].products[12];

    const apy = stakingData.apr;

    const rounded = Math.round(apy * 100) / 100;

    const updatedData = {
      coin: "USDT",
      apy: rounded + "%",
      type: "flexible",
      exchange: {
        title: "Kukoin",
        link: "https://www.gate.com/uk/simple-earn",
      },
    };

    return updatedData;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}

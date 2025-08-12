export async function getGateLaunchpool() {
  try {
    const res = await fetch(
      "https://www.gate.com/apiw/v2/earn/launch-pool/project-list?page=1&pageSize=6&status=1"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch staking data: ${res.status}`);
    }

    const data = await res.json();

    const launchpoolData = data.data.list;

    const updatedData = launchpoolData.map((item) => {
      const unixDate = new Date(1000 * item.real_end_timest);
      const endTime = unixDate.toISOString();

      const rewardsPool = item.reward_pools.map((rewards) => {
        return {
          coin: rewards.coin,
          apr: rewards.rate_year + "%",
        };
      });

      return {
        coin: item.coin,
        icon: item.icon,
        endTime,
        rewardsPool,
        exchange: {
          title: "Gate",
          link: "https://www.gate.com/uk/launchpool",
        },
      };
    });

    return updatedData;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}

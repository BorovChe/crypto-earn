import { getGateLaunchpool } from "./gate";

import { LaunchpoolData } from "@/types/launchpool";
import { getKukoinLaunchpool } from "./kukoin";

export const getLaunchpoolList = async (): Promise<LaunchpoolData[]> => {
  const responses = await Promise.allSettled([
    getGateLaunchpool(),
    getKukoinLaunchpool(),
  ]);

  const list = responses
    .filter(
      (r): r is PromiseFulfilledResult<LaunchpoolData[]> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value);

  return list.flat();
};

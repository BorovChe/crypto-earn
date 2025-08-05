import Link from "next/link";

import { getBybitStaking } from "@/services/staking/getBybitStaking";
import { getMexcStaking } from "@/services/staking/getMexcStaking";
import { getBitgetStaking } from "@/services/staking/getBitgetStaking";
import { getBingXStaking } from "../../services/staking/getBingXStaking";

const StakingPage = async () => {
  const bybitData = await getBybitStaking();
  const mexcData = await getMexcStaking();
  const bitgetData = await getBitgetStaking();
  const bingXData = await getBingXStaking();
  console.log(bingXData);

  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl text-center font-bold">Staking Page</h1>

      <ul>
        <li className="flex justify-center gap-10">
          <p>{mexcData.coin}</p>
          <Link href={mexcData.exchange.link}>{mexcData.exchange.title}</Link>
          <p>{mexcData.apy}</p>
          <p>{mexcData.type}</p>
        </li>
        <li className="flex justify-center gap-10">
          <p>{bybitData.coin}</p>
          <Link href={bybitData.exchange.link}>{bybitData.exchange.title}</Link>
          <p>{bybitData.apy}</p>
          <p>{bybitData.type}</p>
        </li>
        <li className="flex justify-center gap-10">
          <p>{bitgetData.coin}</p>
          <Link href={bitgetData.exchange.link}>
            {bitgetData.exchange.title}
          </Link>
          <p>{bitgetData.apy}</p>
          <p>{bitgetData.type}</p>
        </li>
      </ul>
    </div>
  );
};

export default StakingPage;

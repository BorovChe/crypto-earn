import Link from "next/link";

import { getBybitStaking } from "@/services/staking/getBybitStaking";
import { getMexcStaking } from "@/services/staking/getMexcStaking";
import { getBitgetStaking } from "@/services/staking/getBitgetStaking";
import { getGateStaking } from "@/services/staking/getGateStaking";
import { getBinanceStaking } from "@/services/staking/getBinanceStaking";
import { getKukoinStaking } from "@/services/staking/getKukoinStaking";
import { getOkxStaking } from "@/services/staking/getOkxStaking";
import { getHuobiStaking } from "@/services/staking/getHuobiStaking";
import { IStakingData } from "@/interfaces/staking";
// import { getWhitebitStaking } from "@/services/staking/getWhiteBitStaking";
// import { getBingXStaking } from "../../services/staking/getBingXStaking";

export const revalidate = 1000;

const StakingPage = async () => {
  const bybitData: IStakingData = await getBybitStaking()!;
  const mexcData: IStakingData = await getMexcStaking()!;
  const bitgetData: IStakingData = await getBitgetStaking()!;
  const gateData: IStakingData = await getGateStaking()!;
  const binanceData: IStakingData = await getBinanceStaking();
  const kukoinData: IStakingData = await getKukoinStaking()!;
  const okxData: IStakingData = await getOkxStaking()!;
  const huobiData: IStakingData = await getHuobiStaking()!;
  // console.log(bybitData);!
  // const whitebitData = await getWhitebitStaking();
  // console.log(whitebitData);
  // const bingXData = await getBingXStaking();
  // console.log(bingXData);

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
        <li className="flex justify-center gap-10">
          <p>{gateData.coin}</p>
          <Link href={gateData.exchange.link}>{gateData.exchange.title}</Link>
          <p>{gateData.apy}</p>
          <p>{gateData.type}</p>
        </li>
        <li className="flex justify-center gap-10">
          <p>{binanceData.coin}</p>
          <Link href={binanceData.exchange.link}>
            {binanceData.exchange.title}
          </Link>
          <p>{binanceData.apy}</p>
          <p>{binanceData.type}</p>
        </li>
        <li className="flex justify-center gap-10">
          <p>{kukoinData.coin}</p>
          <Link href={kukoinData.exchange.link}>
            {kukoinData.exchange.title}
          </Link>
          <p>{kukoinData.apy}</p>
          <p>{kukoinData.type}</p>
        </li>
        <li className="flex justify-center gap-10">
          <p>{okxData.coin}</p>
          <Link href={okxData.exchange.link}>{okxData.exchange.title}</Link>
          <p>{okxData.apy}</p>
          <p>{okxData.type}</p>
        </li>
        <li className="flex justify-center gap-10">
          <p>{huobiData.coin}</p>
          <Link href={huobiData.exchange.link}>{huobiData.exchange.title}</Link>
          <p>{huobiData.apy}</p>
          <p>{huobiData.type}</p>
        </li>
      </ul>
    </div>
  );
};

export default StakingPage;

import Link from "next/link";

import { getBybitStaking } from "../../../pages/api/staking/getBybitStaking";
import { getMexcStaking } from "../../../pages/api/staking/getMexcStaking";
import { getBitgetStaking } from "../../../pages/api/staking/getBitgetStaking";
import { getGateStaking } from "../../../pages/api/staking/getGateStaking";
import { getBinanceStaking } from "../../../pages/api/staking/getBinanceStaking";
import { getKukoinStaking } from "../../../pages/api/staking/getKukoinStaking";
import { getOkxStaking } from "../../../pages/api/staking/getOkxStaking";
import { getHuobiStaking } from "../../../pages/api/staking/getHuobiStaking";
import { IStakingData } from "@/interfaces/staking";

export const dynamic = "force-dynamic";

const StakingPage = async () => {
  let bybitData: IStakingData | null = null;
  let mexcData: IStakingData | null = null;
  let bitgetData: IStakingData | null = null;
  let gateData: IStakingData | null = null;
  let binanceData: IStakingData | null = null;
  let kukoinData: IStakingData | null = null;
  let okxData: IStakingData | null = null;
  let huobiData: IStakingData | null = null;

  try {
    bybitData = await getBybitStaking();
  } catch (e) {
    console.error("Bybit staking error:", e);
  }

  try {
    mexcData = await getMexcStaking();
  } catch (e) {
    console.error("MEXC staking error:", e);
  }

  try {
    bitgetData = await getBitgetStaking();
  } catch (e) {
    console.error("Bitget staking error:", e);
  }

  try {
    gateData = await getGateStaking();
  } catch (e) {
    console.error("Gate staking error:", e);
  }

  try {
    binanceData = await getBinanceStaking();
  } catch (e) {
    console.error("Binance staking error:", e);
  }

  try {
    kukoinData = await getKukoinStaking();
  } catch (e) {
    console.error("Kukoin staking error:", e);
  }

  try {
    okxData = await getOkxStaking();
  } catch (e) {
    console.error("OKX staking error:", e);
  }

  try {
    huobiData = await getHuobiStaking();
  } catch (e) {
    console.error("Huobi staking error:", e);
  }

  const stakingList = [
    mexcData,
    bybitData,
    bitgetData,
    gateData,
    binanceData,
    kukoinData,
    okxData,
    huobiData,
  ].filter(Boolean) as IStakingData[];

  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl text-center font-bold">Staking Page</h1>
      <ul>
        {stakingList.map((data, index) => (
          <li key={index} className="flex justify-center gap-10">
            <p>{data.coin}</p>
            <Link href={data.exchange.link}>{data.exchange.title}</Link>
            <p>{data.apy}</p>
            <p>{data.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StakingPage;

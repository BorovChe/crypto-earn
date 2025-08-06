import { NextResponse } from "next/server";
// import { getBybitStaking } from "../bybit";
// import { getBinanceStaking } from "../binance";
// import { getMexcStaking } from "../mexc";
// import { getBitgetStaking } from "../bitget";
import { getGateStaking } from "../gate";
import { getHuobiStaking } from "../huobi";
import { getKukoinStaking } from "../kukoin";
import { getOkxStaking } from "../okx";

export async function GET() {
  const responses = await Promise.allSettled([
    // getBybitStaking(),
    // getMexcStaking(),
    // getBinanceStaking(),
    // getBitgetStaking(),
    getGateStaking(),
    getHuobiStaking(),
    getKukoinStaking(),
    getOkxStaking(),
  ]);

  const list = responses
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);

  if (!list.length) {
    console.error(responses);
    return NextResponse.json({ error: "All sources failed" }, { status: 500 });
  }

  return NextResponse.json(list);
}

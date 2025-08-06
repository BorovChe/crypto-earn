import { NextResponse } from "next/server";
import { getBybitStaking } from "../bybit";
import { getBinanceStaking } from "../binance";
import { getMexcStaking } from "../mexc";
import { getBitgetStaking } from "../bitget";
import { getGateStaking } from "../gate";
import { getHuobiStaking } from "../huobi";
import { getKukoinStaking } from "../kukoin";
import { getOkxStaking } from "../okx";

export async function GET() {
  try {
    const [bybit, mexc, binance, bitget, gate, huobi, kukoin, okx] =
      await Promise.all([
        getBybitStaking(),
        getMexcStaking(),
        getBinanceStaking(),
        getBitgetStaking(),
        getGateStaking(),
        getHuobiStaking(),
        getKukoinStaking(),
        getOkxStaking(),
      ]);

    const result = [
      bybit,
      mexc,
      binance,
      bitget,
      gate,
      huobi,
      kukoin,
      okx,
    ].filter(Boolean);

    return NextResponse.json(result);
  } catch (err) {
    console.error("fetchAllStaking error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

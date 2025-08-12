import { NextResponse } from "next/server";

import { getGateLaunchpool } from "../gate";

export async function GET() {
  const responses = await Promise.allSettled([getGateLaunchpool()]);

  const list = responses
    .filter((r): r => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value);

  if (!list.length) {
    console.error(list);
    return NextResponse.json({ error: "All sources failed" }, { status: 500 });
  }

  const combinedData = list.flat();

  return NextResponse.json(combinedData);
}

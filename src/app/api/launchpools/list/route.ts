import { NextResponse } from "next/server";

import { getGateLaunchpool } from "../gate";

export async function GET() {
  const responses = await Promise.allSettled([getGateLaunchpool()]);

  function isFulfilled<T>(
    r: PromiseSettledResult<T>
  ): r is PromiseFulfilledResult<T> {
    return r.status === "fulfilled" && r.value !== null;
  }

  const list = responses.filter(isFulfilled).map((r) => r.value);

  if (!list.length) {
    console.error(list);
    return NextResponse.json({ error: "All sources failed" }, { status: 500 });
  }

  const combinedData = list.flat();

  return NextResponse.json(combinedData);
}

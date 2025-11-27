// src/services/arbitrage/fetchData.ts
export const BATCH_SIZE = 30;

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getMexcTokens() {
  const resInfo = await fetch("https://api.mexc.com/api/v3/exchangeInfo");
  const dataInfo = await resInfo.json();

  const resPrices = await fetch("https://api.mexc.com/api/v3/ticker/price");
  const prices = await resPrices.json();
  const priceMap: Record<string, number> = {};
  prices.forEach((p: any) => {
    priceMap[p.symbol] = parseFloat(p.price);
  });

  return dataInfo.symbols
    .filter((s: any) => s.contractAddress)
    .map((s: any) => ({
      symbol: s.symbol,
      contractAddress: s.contractAddress.toLowerCase(),
      price: priceMap[s.symbol] ?? null,
    }));
}

async function fetchDexBatch(batch: string[]) {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${batch.join(",")}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.pairs || [];
  } catch (err) {
    // await delay(500);
    // return fetchDexBatch(batch);
  }
}

export async function fetchAllDexData(contracts: string[]) {
  const BATCH_SIZE = 30;
  const MAX_PARALLEL = 5;
  const result: Record<string, any> = {};

  // разбиваем контракты на батчи
  const batches: string[][] = [];
  for (let i = 0; i < contracts.length; i += BATCH_SIZE) {
    batches.push(contracts.slice(i, i + BATCH_SIZE));
  }

  let i = 0;
  while (i < batches.length) {
    const pool = batches.slice(i, i + MAX_PARALLEL);

    const responses = await Promise.all(
      pool.map((batch) =>
        fetchDexBatch(batch)
          .then((data) => data?.pairs ?? []) // безопасно извлекаем pairs
          .catch((err) => {
            console.error("Ошибка батча:", err);
            return [];
          })
      )
    );

    responses.forEach((pairs) => {
      if (!pairs) return;
      pairs.forEach((p: any) => {
        const addr = p.baseToken?.address?.toLowerCase();
        if (!addr) return;
        result[addr] = p;
      });
    });

    i += MAX_PARALLEL;
    await new Promise((r) => setTimeout(r, 200));
  }

  return result;
}

export function calculateSpread(
  mexcTokens: any[],
  dexMap: Record<string, any>
) {
  const test: any = [];

  mexcTokens.forEach((t) => {
    const pair = dexMap[t.contractAddress];
    if (!pair) return { ...t, dexPrice: null, spread: null, liquidity: null };

    const dexPrice = parseFloat(pair.priceUsd || pair.tokenPrice || "0");
    const spread = t.price ? ((t.price - dexPrice) / dexPrice) * 100 : null;

    test.push({
      ...t,
      dexPrice,
      spread,
      liquidity: parseFloat(pair.liquidity?.usd || "0"),
      dex: "Dexscreener",
    });
  });

  return test;
}

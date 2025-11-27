// export async function getMexcTokensWithPrices() {
//   try {
//     const resInfo = await fetch("https://api.mexc.com/api/v3/exchangeInfo");
//     const dataInfo = await resInfo.json();

//     const tokens: any = [];

//     dataInfo.symbols.forEach((s: any) => {
//       if (s.contractAddress === "") return;

//       tokens.push({
//         symbol: s.symbol,
//         contractAddress: s.contractAddress,
//       });
//     });

//     const resPrices = await fetch("https://api.mexc.com/api/v3/ticker/price");
//     const prices = await resPrices.json();

//     const priceMap = {};
//     prices.forEach((p: any) => {
//       priceMap[p.symbol] = parseFloat(p.price);
//     });

//     return tokens.map((t: any) => ({
//       ...t,
//       price: priceMap[t.symbol] ?? null,
//     }));
//   } catch (err) {
//     console.error("Ошибка получения токенов/цен MEXC:", err);
//     return [];
//   }
// }

// async function getDexBatch(contracts: string[]) {
//   try {
//     const url = `https://api.dexscreener.com/latest/dex/tokens/${contracts.join(
//       ","
//     )}`;
//     const res = await fetch(url);

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("Dexscreener error:", res.status, text.slice(0, 200));
//       return [];
//     }

//     const data = await res.json();
//     return data.pairs || [];
//   } catch (err) {
//     console.error("Fetch Dexscreener failed:", err);
//     return [];
//   }
// }

// async function delay(ms: number) {
//   return new Promise((r) => setTimeout(r, ms));
// }

// async function getAllDexData(contracts: string[]) {
//   const result: Record<string, any> = {};
//   const BATCH_SIZE = 5; // меньше токенов на запрос, чтобы не перегружать API
//   const allBatches: string[][] = [];

//   for (let i = 0; i < contracts.length; i += BATCH_SIZE) {
//     allBatches.push(contracts.slice(i, i + BATCH_SIZE));
//   }

//   for (const batch of allBatches) {
//     let success = false;
//     let retries = 0;
//     while (!success && retries < 5) {
//       try {
//         const pairs = await getDexBatch(batch);
//         pairs.forEach((p: any) => {
//           const addr = p.baseToken?.address?.toLowerCase();
//           if (!addr) return;
//           const liquidityUsd = p.liquidity?.usd ?? 0;
//           if (
//             !result[addr] ||
//             liquidityUsd > (result[addr]?.liquidity?.usd ?? 0)
//           ) {
//             result[addr] = p;
//           }
//         });
//         success = true;
//       } catch (err) {
//         retries++;
//         const wait = Math.pow(2, retries) * 1000; // экспоненциальная задержка
//         console.warn(`Retry ${retries} for batch, waiting ${wait}ms`);
//         await delay(wait);
//       }
//     }

//     await delay(2000); // пауза между батчами
//   }

//   return result;
// }

// async function getEthUsdMexc() {
//   const res = await fetch(
//     "https://api.mexc.com/api/v3/ticker/price?symbol=ETHUSDT"
//   );
//   const data = await res.json();
//   return parseFloat(data.price);
// }

// export async function getArbitrageData() {
//   const mexcTokens = await getMexcTokensWithPrices();
//   const contracts = mexcTokens.map((t) => t.contractAddress).filter((c) => !!c);

//   const dexMap = await getAllDexData(contracts);

//   // курс эфира для пересчёта derivedETH (если решишь использовать сабграфы)
//   const ethUsd = await getEthUsdMexc();

//   return mexcTokens.map((t) => {
//     const dexPair = dexMap[t.contractAddress?.toLowerCase()];
//     if (!dexPair) {
//       return { ...t, dexPrice: null, spread: null, liquidity: null };
//     }

//     // DexScreener даёт цену сразу в USD
//     const dexPrice = parseFloat(dexPair.priceUsd);

//     // Если цена на MEXC есть — считаем спред
//     const spread = t.price ? ((t.price - dexPrice) / dexPrice) * 100 : null;

//     return {
//       ...t,
//       dexPrice,
//       dex: dexPair.dexId,
//       liquidity: dexPair.liquidity?.usd ?? 0,
//       spread,
//     };
//   });
// }

// import { GraphQLClient, gql } from "graphql-request";

// const API_KEY = "e6c514b3b5c525ddb614033e6990a93d";

// const UNISWAP_V4 = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/DiYPVdygkfjDWhbxGSqAQxwBKmfKnkWQojqeM2rkLb3G`;
// const client = new GraphQLClient(UNISWAP_V4);

// const query = gql`
//   query getTokens($first: Int!, $skip: Int!) {
//     tokens(
//       first: $first
//       skip: $skip
//       orderBy: volumeUSD
//       orderDirection: desc
//     ) {
//       id
//       symbol
//       name
//       derivedETH
//       volumeUSD
//       totalValueLockedUSD
//     }
//   }
// `;

// export async function getAllUniswapTokens(batchSize = 3000) {
//   let allTokens: any[] = [];
//   let skip = 0;
//   let fetched: any[] = [];

//   do {
//     fetched = await client.request(query, { first: batchSize, skip });
//     allTokens = allTokens.concat(fetched.tokens);
//     skip += batchSize;
//     console.log(`Fetched ${allTokens.length} tokens...`);
//   } while (fetched.tokens.length === batchSize);

//   return allTokens;
// }

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

// export async function getEthUsdMexc() {
//   const res = await fetch(
//     "https://api.mexc.com/api/v3/ticker/price?symbol=ETHUSDT"
//   );
//   const data = await res.json();
//   console.log(data);
//   return parseFloat(data.price);
// }

// export async function getArbitrageData() {
//   const [uniswapTokens, mexcTokens, ethPrice] = await Promise.all([
//     getAllUniswapTokens(),
//     getMexcTokensWithPrices(),
//     getEthUsdMexc(),
//   ]);

//   const uniswapMap = {};
//   uniswapTokens.forEach((t: any) => {
//     uniswapMap[t.id.toLowerCase()] = {
//       ...t,
//       priceUsd: parseFloat(t.derivedETH) * ethPrice,
//     };
//   });

//   const test: any = [];

//   mexcTokens.forEach((t: any) => {
//     const uniToken = uniswapMap[t.contractAddress];
//     if (!uniToken || uniToken.priceUsd === 0) {
//       return;
//     }

//     const dexPrice = uniToken.priceUsd;
//     const spread = t.price ? ((t.price - dexPrice) / dexPrice) * 100 : null;
//     test.push({
//       ...t,
//       dexPrice,
//       dexSymbol: uniToken.symbol,
//       dexName: uniToken.name,
//       spread,
//     });
//   });

//   return test;
// }

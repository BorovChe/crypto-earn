// import { GraphQLClient, gql } from "graphql-request";

// const NODEREAL_URL =
//   "https://open-platform.nodereal.io/7c5c7ce5cc1f42f58abf609f4afdbf85/pancakeswap-free/graphql";
// const client = new GraphQLClient(NODEREAL_URL);

// const BATCH_SIZE = 1000;

// const PAIRS_QUERY = gql`
//   query getPairs($first: Int!, $skip: Int!) {
//     pairs(first: $first, skip: $skip) {
//       id
//       token0 {
//         id
//         symbol
//       }
//       token1 {
//         id
//         symbol
//       }
//       reserveUSD
//     }
//   }
// `;

// export async function getAllPancakePairs() {
//   let allPairs: any[] = [];
//   let skip = 0;
//   let fetched: any[] = [];

//   do {
//     try {
//       const data = await client.request(PAIRS_QUERY, {
//         first: BATCH_SIZE,
//         skip,
//       });
//       fetched = data.pairs || [];
//       allPairs = allPairs.concat(fetched);
//       skip += BATCH_SIZE;
//       console.log(`Fetched ${allPairs.length} pairs...`);
//     } catch (err) {
//       console.error("Error fetching Pancake pairs:", err);
//       break;
//     }
//   } while (fetched.length === BATCH_SIZE);

//   return allPairs;
// }

// async function getWBNBPriceUSD() {
//   const res = await fetch(
//     "https://api.mexc.com/api/v3/ticker/price?symbol=BNBUSDT"
//   );
//   const data = await res.json();
//   return parseFloat(data.price);
// }

// // Пример функции сопоставления с MEXC токенами
// export async function getPancakeArbitrageData(
//   mexcTokens: { contractAddress: string; price: number; symbol: string }[]
// ) {
//   const wbnbPriceUSD = await getWBNBPriceUSD();
//   const pancakePairs = await getAllPancakePairs();

//   const result = mexcTokens.map((t) => {
//     // Ищем пару на PancakeSwap
//     const pair = pancakePairs.find(
//       (p) =>
//         p.token0.id.toLowerCase() === t.contractAddress.toLowerCase() ||
//         p.token1.id.toLowerCase() === t.contractAddress.toLowerCase()
//     );

//     if (!pair) return;

//     const tokenReserve =
//       pair.token0.id.toLowerCase() === t.contractAddress.toLowerCase()
//         ? parseFloat(pair.reserve0)
//         : parseFloat(pair.reserve1);

//     const wbnbReserve =
//       pair.token0.symbol === "WBNB"
//         ? parseFloat(pair.reserve0)
//         : parseFloat(pair.reserve1);

//     const dexPrice = wbnbPriceUSD * (wbnbReserve / tokenReserve);
//     const spread = t.price ? ((t.price - dexPrice) / dexPrice) * 100 : null;

//     return {
//       ...t,
//       dexPrice,
//       spread,
//       dex: "PancakeSwap",
//       liquidity: parseFloat(pair.reserveUSD),
//     };
//   });

//   return result;
// }

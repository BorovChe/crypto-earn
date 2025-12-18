import {
  fetchBinanceAssets,
  fetchBinanceStakingData,
} from "@/services/staking/binance";

import { IStakingList } from "@/types/staking";
import { findAsset, handleApyRange, isStakingType } from "../utils/binance";

export const getBinanceStaking = async (): Promise<IStakingList[] | null> => {
  const data = await fetchBinanceStakingData();
  const assets = await fetchBinanceAssets();

  if (!data || !assets) return null;

  return data.data.list.map<IStakingList>((item) => {
    const { apyRange, asset, productDetailList } = item;

    return {
      coin: asset,
      apy: handleApyRange(apyRange),
      logoUrl: findAsset(assets.data, asset),
      flexibleType: isStakingType(productDetailList, "LENDING_FLEXIBLE"),
      fixedType: isStakingType(productDetailList, "POS_FIXED"),
      productDetailList: [],
      exchange: {
        title: "Binance",
        link: "https://www.binance.com/ru-UA/earn/simple-earn",
      },
    };
  });
};

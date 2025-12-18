import { IAsset } from "@/types/common";
import { IProductDetailList } from "@/types/staking";

export const handleApyRange = (apy: number[]) => {
  const [min, max] = apy;
  const formatApy = (v: number) => Math.round(v * 10000) / 100;

  return max !== undefined
    ? [formatApy(min), formatApy(max)]
    : [formatApy(min)];
};

export const isStakingType = (data: IProductDetailList[], type: string) => {
  return data.some(({ productType }) => productType === type);
};

export const findAsset = (data: IAsset[], asset: string) => {
  const foundAsset = data.find(({ assetCode }) => assetCode == asset);
  return foundAsset?.logoUrl || "/icons/coins/dummy.svg";
};

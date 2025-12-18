import { safeFetch } from "@/tools/safeFetch";
import { API_EXCHANGES_BASE_URLS } from "@/config/base-exchange-urls";
import { IAsset } from "@/types/common";

interface BinanceApiResponse {
  data: {
    list: {
      asset: string;
      apyRange: number[];
      productDetailList: { productType: string }[];
    }[];
  };
}

interface BinanceIconsApiResponse {
  data: IAsset[];
}

export const fetchBinanceStakingData = async () => {
  return await safeFetch<BinanceApiResponse>(
    `${API_EXCHANGES_BASE_URLS.BINANCE}/bapi/earn/v1/friendly/finance-earn/simple-earn/homepage/details?requestSource=WEB&pageIndex=1&pageSize=400&includeEthStaking=true&includeSolStaking=true&includeP2pLoan=true&simpleEarnType=ALL`
  );
};

export const fetchBinanceAssets = async () => {
  return safeFetch<BinanceIconsApiResponse>(
    `${API_EXCHANGES_BASE_URLS.BINANCE}/bapi/asset/v2/public/asset/asset/get-all-asset`
  );
};

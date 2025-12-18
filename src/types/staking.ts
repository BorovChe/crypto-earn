export interface IStakingList {
  coin: string;
  apy: number[];
  logoUrl: string;
  flexibleType: boolean;
  fixedType: boolean;
  productDetailList: IProductDetailList[];
  exchange: {
    title: string;
    link: string;
  };
}

export interface IProductDetailList {
  productType: string;
}

export interface IStakingData {
  totalPages: number;
  page: number;
  list: IStakingList[];
}

export enum StakingSort {
  DEFAULT = "",
  APR_ASC = "apr_asc",
  APR_DESC = "apr_desc",
  COIN_ASC = "coin_asc",
  COIN_DESC = "coin_desc",
  EXCHANGE_ASC = "exchange_asc",
  EXCHANGE_DESC = "exchange_desc",
}

export interface StakingList {
  coin: string;
  apy: string;
  type: string;
  logoUrl: string;
  exchange: {
    title: string;
    link: string;
  };
}

export interface StakingData {
  totalPages: number;
  page: number;
  list: StakingList[];
}

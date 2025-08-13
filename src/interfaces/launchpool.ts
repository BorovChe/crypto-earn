export interface LaunchpoolData {
  coin: string;
  icon: string;
  endTime: string;
  rewardsPool: { coin: string; apr: string }[];
  exchange: {
    title: string;
    link: string;
  };
}

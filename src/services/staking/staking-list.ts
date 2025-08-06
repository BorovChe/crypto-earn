import { IStakingData } from "@/interfaces/staking";

export async function getStakingList(): Promise<IStakingData[] | null> {
  try {
    const res = await fetch("http://localhost:3000//api/staking/list", {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

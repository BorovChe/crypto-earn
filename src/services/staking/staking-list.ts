import { IStakingData } from "@/interfaces/staking";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getStakingList(): Promise<IStakingData[] | null> {
  try {
    const res = await fetch(`${baseUrl}/api/staking/list`, {
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

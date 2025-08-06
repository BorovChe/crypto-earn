import Link from "next/link";
import { getStakingList } from "@/services/staking/staking-list";
import { IStakingData } from "@/interfaces/staking";

export const dynamic = "force-dynamic";
// export const revalidate = 60;

const StakingPage = async () => {
  const stakingList: IStakingData[] | null = await getStakingList();

  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl text-center font-bold">Staking Page</h1>
      <ul>
        {stakingList &&
          stakingList.map((data, index) => (
            <li key={index} className="flex justify-center gap-10">
              <p>{data.coin}</p>
              <Link href={data.exchange.link}>{data.exchange.title}</Link>
              <p>{data.apy}</p>
              <p>{data.type}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StakingPage;

import Image from "next/image";
import Link from "next/link";

import { getStakingList } from "@/services/staking/staking-list";

import Container from "@/components/UI/Container";
import LastUpdateTime from "@/components/tools/last-update-time/LastUpdateTime";
import tether from "../../../public/icons/coins/tether.svg";

import { StakingData } from "@/interfaces/staking";

export const revalidate = 1200;

const StakingPage = async () => {
  const stakingList: StakingData[] = await getStakingList();

  if (!stakingList.length) {
    return <div>Ошибка загрузки. Попробуйте позже</div>;
  }

  return (
    <section className="py-10">
      <Container>
        <div className="flex justify-between">
          <h1 className="mb-4 text-xl text-left font-bold uppercase">
            Staking Page
          </h1>
          <div className="flex gap-4">
            <LastUpdateTime />
          </div>
        </div>
        <ul className="flex justify-center items-center flex-col">
          {stakingList.map((data, index) => (
            <li
              key={index}
              className="flex justify-between items-baseline  py-4 w-full border-b
              border-solid border-b-[#757576]"
            >
              <Link href={data.exchange.link} className="w-16">
                {data.exchange.title}
              </Link>
              <div className="flex gap-4">
                <Image src={tether} width={30} height={30} alt={data.coin} />
                <p>{data.coin}</p>
              </div>
              <p className="w-16 text-[#20b26c] font-medium">{data.apy}</p>
              <p>{data.type}</p>
              <div className="w-8">▼</div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default StakingPage;

import { IStakingData } from "@/interfaces/staking";
// import { getStakingList } from "@/services/staking/staking-list";
import Image from "next/image";
import Link from "next/link";

import tether from "../../../public/icons/coins/tether.svg";
import Container from "@/components/UI/Container";
import { getList } from "@/services/staking/staking/list/route";

const StakingPage = async () => {
  const stakingList: IStakingData[] | null = await getList();

  if (!stakingList) {
    return <div>Ошибка загрузки. Попробуйте позже</div>;
  }

  return (
    <section className="py-10">
      <Container>
        <h1 className="mb-4 text-xl text-left font-bold uppercase">
          Staking Page
        </h1>
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

// border-bottom: 1px solid var(--gray-ele-ele-line, #f3f5f7);
export default StakingPage;

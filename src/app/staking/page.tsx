import Image from "next/image";
import Link from "next/link";

import { getStakingList } from "@/services/staking/staking-list";

import Container from "@/components/UI/Container";
import LastUpdateTime from "@/components/tools/last-update-time/LastUpdateTime";
import Pagination from "@/components/pagination/Pagination";
// import SideBar from "@/components/layout/SideBar";

import { StakingData, StakingList } from "@/interfaces/staking";

const StakingPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page: number = params.page ?? 1;

  const stakingData: StakingData | null = await getStakingList(+page, 15);

  const filteredData = (): StakingList[] | null => {
    if (!params.coin) return stakingData!.list;
    return stakingData!.list.filter(
      ({ coin }) => coin.toLowerCase() === params?.coin?.toLowerCase()
    );
  };

  if (!stakingData || !stakingData.list.length) {
    return <div>Ошибка загрузки. Попробуйте позже</div>;
  }

  return (
    <section className="py-10 relative">
      {/* <SideBar /> */}
      <Container>
        <div className="flex justify-between">
          <h1 className="mb-4 text-xl text-left font-bold uppercase">
            Staking Page
          </h1>
          <Link
            href={"/staking"}
            className="flex justify-center items-center bg-slate-800 rounded-sm py-2 px-4"
          >
            All Coins
          </Link>
          <Link
            href={"?coin=usdt"}
            className={
              "flex justify-center items-center bg-slate-800 rounded-sm py-2 px-4"
            }
          >
            USDT
          </Link>
          <div className="flex gap-4">
            <LastUpdateTime />
          </div>
        </div>
        <ul className="mb-4 flex justify-center items-center flex-col">
          {filteredData()!.map((data, index) => (
            <li
              key={index}
              className="flex justify-between items-baseline  py-4 w-full border-b
              border-solid border-b-[#757576]"
            >
              <Link href={data.exchange.link} className="w-16">
                {data.exchange.title}
              </Link>
              <div className="flex gap-4">
                <Image
                  src={data.logoUrl}
                  width={30}
                  height={30}
                  alt={data.coin}
                  className="rounded-full"
                />
                <p>{data.coin}</p>
              </div>
              <p className="w-16 text-[#20b26c] font-medium">{data.apy}</p>
              <p>{data.type}</p>
              <div className="w-8">▼</div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          {filteredData()!.length > 14 && (
            <Pagination
              currentPage={stakingData.page}
              totalPages={stakingData.totalPages}
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default StakingPage;

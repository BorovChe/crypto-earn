import { getStakingList } from "@/server/staking/staking-list";

import {
  StakingList,
  SortControls,
  // MultiSelectFilter,
} from "@/features/staking/components/index";
import { Container } from "@/components/UI/index";

import { IStakingData } from "@/types/staking";

const PAGE_SIZE = 15;

interface SearchParamsProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const StakingPage = async ({ searchParams }: SearchParamsProps) => {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const sort = params.sort || "";

  const { list }: IStakingData = await getStakingList(
    { page, sort },
    PAGE_SIZE
  );

  return (
    <section className="py-10 relative">
      <Container>
        <div className="flex justify-center gap-[600px]">
          <h1 className="mb-4 text-xl text-left font-bold uppercase">
            Staking Page
          </h1>
          {/* <MultiSelectFilter /> */}
        </div>
        <SortControls />
        <StakingList stakingList={list} />
      </Container>
    </section>
  );
};

export default StakingPage;

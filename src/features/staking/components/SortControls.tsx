"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import activeSort from "../logic/active-sort";

import { SortIcon } from "@/components/UI/index";

import { StakingSort } from "@/types/staking";

const sortOptions = [
  { label: "Coin", asc: StakingSort.COIN_ASC, desc: StakingSort.COIN_DESC },
  {
    label: "Exchange",
    asc: StakingSort.EXCHANGE_ASC,
    desc: StakingSort.EXCHANGE_DESC,
  },
  { label: "APR", asc: StakingSort.APR_ASC, desc: StakingSort.APR_DESC },
];

const SortControls = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const sort = searchParams.get("sort") || StakingSort.DEFAULT;

  const handleSorting = (sortAsc: string, sortDesc: string) => {
    if (sort === sortAsc) params.set("sort", sortDesc);
    else if (sort === sortDesc) params.delete("sort");
    else params.set("sort", sortAsc);

    router.push(pathname + "?" + params);
  };

  return (
    <div className="mx-auto flex items-center gap-[76px] py-4 w-[800px] border-b border-solid border-b-[#757576]">
      {sortOptions.map(({ label, asc, desc }) => (
        <button
          key={label}
          className="w-[120px] flex items-center cursor-pointer"
          onClick={() => handleSorting(asc, desc)}
        >
          {label}
          <SortIcon activeSort={activeSort(sort, asc, desc)} />
        </button>
      ))}
      <p className="w-[120px]">Duration(Days)</p>
    </div>
  );
};

export default SortControls;

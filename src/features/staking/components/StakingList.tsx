import Image from "next/image";
import Link from "next/link";

import { ChevronDownIcon } from "@/components/UI";

import { IStakingListProps } from "../types";

const StakingList = ({ stakingList }: IStakingListProps) => {
  if (!stakingList || !stakingList.length) {
    return <div>Ошибка загрузки. Попробуйте позже</div>;
  }

  return (
    <ul className="mb-4 flex justify-center items-center flex-col">
      {stakingList.map((data, index) => {
        const { logoUrl, coin, exchange, apy, flexibleType, fixedType } = data;
        const [min, max] = apy;

        return (
          <li
            key={index}
            className="flex justify-between items-center  py-4 w-[800px] border-b border-solid border-b-[#757576]"
          >
            <div className="flex gap-4 w-[120px]">
              <Image
                src={logoUrl}
                width={30}
                height={30}
                alt={coin}
                className="rounded-full"
              />
              <p>{coin}</p>
            </div>
            <Link href={exchange.link} target="_blank" className="w-[120px]">
              {exchange.title}
            </Link>
            <p className="w-[120px] text-[#20b26c] font-medium">
              {max ? `${min}% ~ ${max}%` : `${min}%`}
            </p>
            <div className="flex gap-1 text-center w-[120px]">
              <p>{flexibleType && "Flexible"}</p>
              {fixedType && flexibleType && <span>/</span>}
              <p>{fixedType && "Fixed"}</p>
            </div>
            <div className="w-[20px]">
              <ChevronDownIcon />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default StakingList;

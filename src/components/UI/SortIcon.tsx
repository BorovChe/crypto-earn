import { IActiveSortColor } from "@/types/common";

interface ISortIconProps {
  activeSort: IActiveSortColor;
}

const SortIcon = ({ activeSort }: ISortIconProps) => {
  const { activeAscColor, activeDescColor } = activeSort;

  return (
    <svg
      width={26}
      height={26}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        style={{ fill: activeDescColor }}
        d="M7.29167 8.75023V7.37401L10 4.45642L12.7083 7.37401V8.75023H7.29167Z"
        fill="#848E9C"
      ></path>
      <path
        style={{ fill: activeAscColor }}
        d="M12.7083 11.25V12.6262L10 15.5438L7.29167 12.6262V11.25H12.7083Z"
        fill="#848E9C"
      ></path>
    </svg>
  );
};

export default SortIcon;

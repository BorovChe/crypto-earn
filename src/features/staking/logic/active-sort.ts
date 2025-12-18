import { IActiveSortColor } from "@/types/common";

const ACTIVE_COLOR = "#FFFF00";
const DEFAULT_COLOR = "#848E9C";

const activeSort = (
  activeSort: string,
  asc: string,
  desc: string
): IActiveSortColor => ({
  activeAscColor: asc === activeSort ? ACTIVE_COLOR : DEFAULT_COLOR,
  activeDescColor: desc === activeSort ? ACTIVE_COLOR : DEFAULT_COLOR,
});

export default activeSort;

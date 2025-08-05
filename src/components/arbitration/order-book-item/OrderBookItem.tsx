import Image from "next/image";

import { IOrderBookItemProps } from "./OrderBookItem.types";

const OrderBookItem = ({
  icon,
  iconWidth,
  exchange,
  buyPrice,
  sellPrice,
}: IOrderBookItemProps) => {
  return (
    <li className="flex flex-col min-w-[160px]">
      <p className="flex gap-2 text-xl">
        <Image src={icon} alt="" width={iconWidth} style={{ height: "auto" }} />
        {exchange}
      </p>
      <p>
        Sell: <span className="text-[#F6465D]">{sellPrice || 0}</span>
      </p>
      <p>
        Buy: <span className="text-[#0ECB81]">{buyPrice || 0}</span>
      </p>
    </li>
  );
};

export default OrderBookItem;

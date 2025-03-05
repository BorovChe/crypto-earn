import { useEffect, useState } from "react";

import OrderBookItem from "../components/OrderBookItem";
import { whitebit } from "../../../../../public/icons/Exchenges";

import { IOrderBookProps } from "@/utils/interfaces/orderBook.interface";

const WhiteBitSpot = ({ ticker }: IOrderBookProps) => {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://api.whitebit.com/ws";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribe = {
        id: 12,
        method: "depth_subscribe",
        params: [`${ticker}_USDT`, 5, "0", true],
      };

      socket.send(JSON.stringify(subscribe));
    };

    socket.onmessage = (event) => {
      const { params } = JSON.parse(event.data);

      if (params) {
        if (params[1].asks) {
          setBuy(params[1].asks[0][0]);
        }
        if (params[1].bids) {
          setSell(params[1].bids[0][0]);
        }
      }
    };

    socket.onclose = () => {
      setBuy(0);
      setSell(0);
    };

    return () => {
      socket.close();
      setBuy(0);
      setSell(0);
    };
  }, [ticker]);

  return (
    <OrderBookItem
      icon={whitebit}
      iconWidth={26}
      exchange={"WhiteBit"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default WhiteBitSpot;

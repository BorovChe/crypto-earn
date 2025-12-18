import React, { useEffect, useState } from "react";

import OrderBookItem from "@/features/arbitration/order-book-item";
import { gate } from "../../../../public/icons/exchenges";

import { OrderBookProps } from "@/types/orderBook";

const GateSpot = ({ ticker }: OrderBookProps) => {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://api.gateio.ws/ws/v4/";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribeMessage = {
        channel: "spot.book_ticker",
        event: "subscribe",
        payload: [`${ticker}_USDT`],
      };

      socket.send(JSON.stringify(subscribeMessage));
    };

    socket.onmessage = (event) => {
      const { result } = JSON.parse(event.data);
      if (result) {
        setBuy(result.b);
        setSell(result.a);
      }
    };

    return () => {
      socket.close();
      setBuy(0);
      setSell(0);
    };
  }, [ticker]);

  return (
    <OrderBookItem
      icon={gate}
      iconWidth={26}
      exchange={"Gate"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default GateSpot;

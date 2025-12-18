import { OrderBookProps } from "@/types/orderBook";
import React, { useEffect, useState } from "react";
import OrderBookItem from "@/features/arbitration/order-book-item";
import { okx } from "../../../../public/icons/exchenges";

const OkxFutures = ({ ticker }: OrderBookProps) => {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://ws.okx.com:8443/ws/v5/public";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribe = {
        op: "subscribe",
        args: [
          {
            channel: "books5",
            instId: `${ticker}-USDT-SWAP`,
          },
        ],
      };

      socket.send(JSON.stringify(subscribe));
    };

    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data);

      if (data) {
        setBuy(data[0].bids[0][0]);
        setSell(data[0].asks[0][0]);
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
      icon={okx}
      iconWidth={24}
      exchange={"OKX"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default OkxFutures;

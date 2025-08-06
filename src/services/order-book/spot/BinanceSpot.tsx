import { useEffect, useState } from "react";

import OrderBookItem from "@/components/arbitration/order-book-item";
import { binance } from "../../../../public/exchenges";

import { IOrderBookProps } from "@/interfaces/orderBook.interface";

const BinanceSpot = ({ ticker }: IOrderBookProps) => {
  const updateTicker: string = ticker.toLowerCase();

  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl: string = "wss://stream.binance.com:9443/ws";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribe = {
        method: "SUBSCRIBE",
        params: [`${updateTicker}usdt@bookTicker`],
        id: 1,
      };

      socket.send(JSON.stringify(subscribe));
    };

    socket.onmessage = (event) => {
      const result = JSON.parse(event.data);

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
  }, [updateTicker]);

  return (
    <OrderBookItem
      icon={binance}
      iconWidth={26}
      exchange={"Binance"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default BinanceSpot;

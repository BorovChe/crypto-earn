import { useEffect, useState } from "react";

import { binance } from "../../../../public/icons/exchenges";

import { IOrderBookProps } from "@/interfaces/orderBook.interface";
import OrderBookItem from "@/components/arbitration/order-book-item";

const BinanceFutures = ({ ticker }: IOrderBookProps) => {
  const updateSymbol = ticker.toLowerCase();

  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://fstream.binance.com/ws";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribe = {
        method: "SUBSCRIBE",
        params: [`${updateSymbol}usdt@bookTicker`],
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
  }, [updateSymbol]);

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

export default BinanceFutures;

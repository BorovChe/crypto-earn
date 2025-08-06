import { useEffect, useState } from "react";

import OrderBookItem from "@/components/arbitration/order-book-item";
import { bybit } from "../../../../public/icons/exchenges";

import { IOrderBookProps } from "@/interfaces/orderBook.interface";

function BybitOrderbook({ ticker }: IOrderBookProps) {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://stream.bybit.com/v5/public/spot";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribe = {
        op: "subscribe",
        args: [`orderbook.200.${ticker}USDT`],
      };

      socket.send(JSON.stringify(subscribe));
    };

    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data);

      if (data?.b && Array.isArray(data.b) && data.b.length > 0) {
        setBuy(data.b[0][0]);
      }

      if (data?.a && Array.isArray(data.a) && data.a.length > 0) {
        setSell(data.a[0][0]);
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
      icon={bybit}
      iconWidth={46}
      exchange={"Bybit"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
}

export default BybitOrderbook;

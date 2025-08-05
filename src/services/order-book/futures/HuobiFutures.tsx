import { useEffect, useState } from "react";
import pako from "pako";

import OrderBookItem from "@/components/arbitration/order-book-item";
import { huobi } from "../../../../public/icons/exchenges";

import { IOrderBookProps } from "@/interfaces/orderBook.interface";

const HuobiFutures = ({ ticker }: IOrderBookProps) => {
  const updateSymbol = ticker.toLowerCase();
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://api.hbdm.vn/linear-swap-ws";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribe = {
        sub: `market.${updateSymbol}-USDT.depth.step0`,
        id: "id5",
      };

      socket.send(JSON.stringify(subscribe));
    };

    socket.onmessage = async (event) => {
      const arrayBuffer = await event.data.arrayBuffer();
      const buf = new Uint8Array(arrayBuffer);

      try {
        const decodedMsg = pako.ungzip(buf, { to: "string" });
        const message = JSON.parse(decodedMsg);

        if (message.ping) {
          socket.send(JSON.stringify({ pong: message.ping }));
          return;
        }

        if (message.tick) {
          setBuy(message.tick.bids[0][0]);
          setSell(message.tick.asks[0][0]);
        }
      } catch (error) {
        console.log("Ошибка декомпрессии:", error);
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
      icon={huobi}
      iconWidth={28}
      exchange={"HTX"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default HuobiFutures;

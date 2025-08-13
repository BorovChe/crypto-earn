import { useEffect, useRef, useState } from "react";

import OrderBookItem from "@/components/arbitration/order-book-item";
import { mexc } from "../../../../public/icons/exchenges";

import { OrderBookProps } from "@/interfaces/orderBook";

const MexcSpot = ({ ticker }: OrderBookProps) => {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const closeSocket = () => {
    if (socketRef.current) {
      socketRef.current.onmessage = null;
      socketRef.current.onclose = null;
      socketRef.current.onerror = null;
      socketRef.current.close();
      socketRef.current = null;
    }
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }

    setBuy(0);
    setSell(0);
  };

  useEffect(() => {
    const connectWebSocket = () => {
      const socketUrl = "wss://wbs.mexc.com/ws";
      const socket = new WebSocket(socketUrl);

      closeSocket();

      socketRef.current = socket;

      socket.onopen = () => {
        const subscribeMessage = {
          method: "SUBSCRIPTION",
          params: [`spot@public.bookTicker.v3.api@${ticker}USDT`],
          id: 1,
        };
        socket.send(JSON.stringify(subscribeMessage));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data) {
          setBuy(data.d?.b);
          setSell(data.d?.a);
        }
      };

      socket.onclose = () => {
        setBuy(0);
        setSell(0);

        reconnectTimeout.current = setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      closeSocket();
    };
  }, [ticker]);

  return (
    <OrderBookItem
      icon={mexc}
      iconWidth={26}
      exchange={"Mexc"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default MexcSpot;

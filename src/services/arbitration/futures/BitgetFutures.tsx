import { useEffect, useRef, useState } from "react";

import OrderBookItem from "@/components/arbitration/order-book-item";
import { bitget } from "../../../../public/icons/exchenges";

import { OrderBookProps } from "@/interfaces/orderBook";

const BitgetFutures = ({ ticker }: OrderBookProps) => {
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
      const socketUrl = "wss://ws.bitget.com/v2/ws/public";
      const socket = new WebSocket(socketUrl);

      closeSocket();
      socketRef.current = socket;

      socket.onopen = () => {
        const subscribe = {
          op: "subscribe",
          args: [
            {
              instType: "USDT-FUTURES",
              channel: "ticker",
              instId: `${ticker}USDT`,
            },
          ],
        };

        socket.send(JSON.stringify(subscribe));
      };

      socket.onmessage = (event) => {
        const { data } = JSON.parse(event.data);
        if (data) {
          setBuy(data[0].bidPr);
          setSell(data[0].askPr);
        }
      };

      socket.onerror = () => {
        reconnectWebSocket();
      };

      socket.onclose = () => {
        reconnectWebSocket();
      };
    };

    connectWebSocket();

    const reconnectWebSocket = () => {
      closeSocket();
      connectWebSocket();
    };

    return () => {
      closeSocket();
    };
  }, [ticker]);

  return (
    <OrderBookItem
      icon={bitget}
      iconWidth={22}
      exchange={"Bitget"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};
export default BitgetFutures;

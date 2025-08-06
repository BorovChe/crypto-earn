import { useEffect, useRef, useState } from "react";
import pako from "pako";

import { bingx } from "../../../../public/exchenges";

import { IOrderBookProps } from "@/interfaces/orderBook.interface";
import OrderBookItem from "@/components/arbitration/order-book-item";

const BingXFutures = ({ ticker }: IOrderBookProps) => {
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
      const socketUrl = "wss://open-api-swap.bingx.com/swap-market";
      const socket = new WebSocket(socketUrl);

      closeSocket();
      socketRef.current = socket;

      socket.onopen = () => {
        const CHANNEL = {
          id: "24dd0e35-56a4-4f7a-af8a-394c7060909c",
          reqType: "sub",
          dataType: `${ticker}-USDT@depth5@100ms`,
        };

        socket.send(JSON.stringify(CHANNEL));
      };

      socket.onmessage = async (event) => {
        const arrayBuffer = await event.data.arrayBuffer();
        const buf = new Uint8Array(arrayBuffer);

        const decodedMsg = pako.inflate(buf, { to: "string" });

        if (decodedMsg === "Ping") {
          socket.send("Pong");
          return;
        }

        if (decodedMsg) {
          const data = JSON.parse(decodedMsg);
          if (data && data.data) {
            setBuy(data.data?.bids[0][0]);
            setSell(data.data?.asks[0][0]);
          }
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
      icon={bingx}
      iconWidth={26}
      exchange={"BingX"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default BingXFutures;

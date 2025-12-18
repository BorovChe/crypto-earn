import { useEffect, useRef, useState } from "react";

import OrderBookItem from "@/features/arbitration/order-book-item";
import { kukoin } from "../../../../public/icons/exchenges";

import { OrderBookProps } from "@/types/orderBook";

const KukoinSpot = ({ ticker }: OrderBookProps) => {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);

  const closeSocket = () => {
    if (socketRef.current) {
      socketRef.current.onmessage = null;
      socketRef.current.onclose = null;
      socketRef.current.onerror = null;
      socketRef.current.close();
      socketRef.current = null;
    }
    if (reconnectInterval.current) {
      clearTimeout(reconnectInterval.current);
      reconnectInterval.current = null;
    }

    setBuy(0);
    setSell(0);
  };

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        closeSocket();

        const response = await fetch(
          "http://localhost:3000/api/arbitration/kukoinToken"
        );
        const { token, instanceServers } = await response.json();

        if (!token || !instanceServers || instanceServers.length === 0) {
          throw new Error("Некорректные данные токена или серверов");
        }

        const wsUrl = `${instanceServers[0].endpoint}?token=${token}`;
        const socket = new WebSocket(wsUrl);

        closeSocket();

        socketRef.current = socket;

        socket.onopen = () => {
          const subscribeMessage = {
            id: Date.now(),
            type: "subscribe",
            topic: `/market/ticker:${ticker}-USDT`,
            response: true,
          };

          socket.send(JSON.stringify(subscribeMessage));
        };

        socket.onmessage = (event) => {
          const { data, type } = JSON.parse(event.data);

          console.log(data);
          if (type === "message" && data) {
            setBuy(data.bestBid);
            setSell(data.bestAsk);
          }
        };

        socket.onerror = () => {
          reconnectWebSocket();
        };

        socket.onclose = () => {
          setBuy(0);
          setSell(0);
          reconnectWebSocket();
        };

        reconnectInterval.current = setTimeout(() => {
          reconnectWebSocket();
        }, 25000);
      } catch (error) {
        console.error("Ошибка подключения к WebSocket:", error);
        setTimeout(connectWebSocket, 5000);
      }
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
      icon={kukoin}
      iconWidth={26}
      exchange={"Kukoin"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default KukoinSpot;

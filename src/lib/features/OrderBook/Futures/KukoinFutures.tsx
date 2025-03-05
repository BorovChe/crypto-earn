import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import OrderBookItem from "../components/OrderBookItem";
import { kukoin } from "../../../../../public/icons/Exchenges";
import { updateTokenPrice } from "../../BestPrice/tokenPriceSlice";

import { IOrderBookProps } from "@/utils/interfaces/orderBook.interface";

const KukoinFutures = ({ ticker }: IOrderBookProps) => {
  const dispatch = useDispatch();
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

        const response = await fetch("/api/futuresToken");
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
            topic: `/contractMarket/tickerV2:${ticker}USDTM`,
            response: true,
          };
          socket.send(JSON.stringify(subscribeMessage));
        };

        socket.onmessage = (event) => {
          const { data } = JSON.parse(event.data);

          if (data) {
            setBuy(data.bestBidPrice);
            setSell(data.bestAskPrice);
          }
        };

        socket.onerror = () => {
          reconnectWebSocket();
        };

        socket.onclose = () => {
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

  useEffect(() => {
    let interval;

    if ( buy && sell && buy !== 0 && sell !== 0) {
      interval = setInterval(() => {
        dispatch(
          updateTokenPrice({
            exchange: "Kukoin",
            token: ticker,
            sellPrice: Number(sell),
            buyPrice: Number(buy),
          })
        );
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [buy, dispatch, sell, ticker]);

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

export default KukoinFutures;

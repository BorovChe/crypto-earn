import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import OrderBookItem from "../components/OrderBookItem";
import { mexc } from "../../../../../public/icons/Exchenges";
import { updateTokenPrice } from "../../BestPrice/tokenPriceSlice";

import { IOrderBookProps } from "@/utils/interfaces/orderBook.interface";

const MexcFutures = ({ ticker }: IOrderBookProps) => {
  const dispatch = useDispatch();
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
      const socketUrl = "wss://contract.mexc.com/edge";
      const socket = new WebSocket(socketUrl);

      closeSocket();

      socketRef.current = socket;

      socket.onopen = () => {
        const subscribeMessage = {
          method: "sub.ticker",
          param: {
            symbol: `${ticker}_USDT`,
          },
          id: Date.now(),
        };
        socket.send(JSON.stringify(subscribeMessage));
      };

      socket.onmessage = (event) => {
        const { data } = JSON.parse(event.data);

        if (data) {
          setBuy(data.bid1);
          setSell(data.ask1);
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

  useEffect(() => {
    let interval;
    if (buy && sell && buy !== 0 && sell !== 0) {
      interval = setInterval(() => {
        dispatch(
          updateTokenPrice({
            exchange: "Mexc",
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
      icon={mexc}
      iconWidth={26}
      exchange={"Mexc"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default MexcFutures;

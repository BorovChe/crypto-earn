import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import OrderBookItem from "../components/OrderBookItem";
import { gate } from "../../../../../public/icons/Exchenges";
import { updateTokenPrice } from "../../BestPrice/tokenPriceSlice";

import { IOrderBookProps } from "@/utils/interfaces/orderBook.interface";

const GateFutures = ({ ticker }: IOrderBookProps) => {
  const dispatch = useDispatch();
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://fx-ws.gateio.ws/v4/ws/usdt";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribeMessage = {
        channel: "futures.book_ticker",
        event: "subscribe",
        payload: [`${ticker}_USDT`],
      };

      socket.send(JSON.stringify(subscribeMessage));
    };

    socket.onmessage = (event) => {
      const { result } = JSON.parse(event.data);

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
  }, [ticker]);

  useEffect(() => {
    let interval;
    if (buy && sell && buy !== 0 && sell !== 0) {
      interval = setInterval(() => {
        dispatch(
          updateTokenPrice({
            exchange: "Gate",
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
      icon={gate}
      iconWidth={26}
      exchange={"Gate"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default GateFutures;

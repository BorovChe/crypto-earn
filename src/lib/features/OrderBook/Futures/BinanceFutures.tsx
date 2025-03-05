import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import OrderBookItem from "../components/OrderBookItem";
import { binance } from "../../../../../public/icons/Exchenges";

import { IOrderBookProps } from "@/utils/interfaces/orderBook.interface";
import { updateTokenPrice } from "../../BestPrice/tokenPriceSlice";

const BinanceFutures = ({ ticker }: IOrderBookProps) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    let interval;

    if (buy && sell && buy !== 0 && sell !== 0) {
      interval = setInterval(() => {
        dispatch(
          updateTokenPrice({
            exchange: "Binance",
            token: ticker,
            sellPrice: sell,
            buyPrice: buy,
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
      icon={binance}
      iconWidth={26}
      exchange={"Binance"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default BinanceFutures;

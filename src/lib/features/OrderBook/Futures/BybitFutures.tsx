import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import OrderBookItem from "../components/OrderBookItem";
import { bybit } from "../../../../../public/icons/Exchenges";

import { IOrderBookProps } from "@/utils/interfaces/orderBook.interface";
import { updateTokenPrice } from "../../BestPrice/tokenPriceSlice";

function BybitFutures({ ticker }: IOrderBookProps) {
  const dispatch = useDispatch();

  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://stream.bybit.com/v5/public/linear";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribe = {
        op: "subscribe",
        args: [`orderbook.50.${ticker}USDT`],
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

  useEffect(() => {
    let interval;
    if (buy && sell && buy !== 0 && sell !== 0) {
      interval = setInterval(() => {
        dispatch(
          updateTokenPrice({
            exchange: "Bybit",
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
  }, [buy, sell, dispatch, ticker]);

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

export default BybitFutures;

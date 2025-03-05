import { IOrderBookProps } from "@/utils/interfaces/orderBook.interface";
import React, { useEffect, useState } from "react";
import OrderBookItem from "../components/OrderBookItem";
import { okx } from "../../../../../public/icons/Exchenges";
import { useDispatch } from "react-redux";
import { updateTokenPrice } from "../../BestPrice/tokenPriceSlice";

const OkxFutures = ({ ticker }: IOrderBookProps) => {
  const dispatch = useDispatch();

  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://ws.okx.com:8443/ws/v5/public";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribe = {
        op: "subscribe",
        args: [
          {
            channel: "books5",
            instId: `${ticker}-USDT-SWAP`,
          },
        ],
      };

      socket.send(JSON.stringify(subscribe));
    };

    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data);

      if (data) {
        setBuy(data[0].bids[0][0]);
        setSell(data[0].asks[0][0]);
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
            exchange: "Okx",
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
      icon={okx}
      iconWidth={24}
      exchange={"OKX"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default OkxFutures;

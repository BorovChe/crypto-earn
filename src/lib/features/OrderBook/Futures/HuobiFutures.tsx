import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import pako from "pako";

import OrderBookItem from "../components/OrderBookItem";
import { huobi } from "../../../../../public/icons/Exchenges";
import { updateTokenPrice } from "../../BestPrice/tokenPriceSlice";

import { IOrderBookProps } from "@/utils/interfaces/orderBook.interface";

const HuobiFutures = ({ ticker }: IOrderBookProps) => {
  const updateSymbol = ticker.toLowerCase();
  const dispatch = useDispatch();
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const socketUrl = "wss://api.hbdm.vn/linear-swap-ws";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      const subscribe = {
        sub: `market.${updateSymbol}-USDT.depth.step0`,
        id: "id5",
      };

      socket.send(JSON.stringify(subscribe));
    };

    socket.onmessage = async (event) => {
      const arrayBuffer = await event.data.arrayBuffer();
      const buf = new Uint8Array(arrayBuffer);

      try {
        const decodedMsg = pako.ungzip(buf, { to: "string" });
        const message = JSON.parse(decodedMsg);

        if (message.ping) {
          socket.send(JSON.stringify({ pong: message.ping }));
          return;
        }

        if (message.tick) {
          setBuy(message.tick.bids[0][0]);
          setSell(message.tick.asks[0][0]);
        }
      } catch (error) {
        console.log("Ошибка декомпрессии:", error);
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
            exchange: "Huobi",
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
      icon={huobi}
      iconWidth={28}
      exchange={"HTX"}
      buyPrice={buy}
      sellPrice={sell}
    />
  );
};

export default HuobiFutures;

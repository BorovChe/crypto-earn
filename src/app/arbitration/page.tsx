"use client";

import { useRef, useState } from "react";

import spotExchanges from "@/services/arbitration/spot";
import futuresExchanges from "@/services/arbitration/futures";
import OrderBookList from "@/features/arbitration/order-book-list";

const Arbitration = () => {
  const [ticker, setTicker] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value;
    if (!value) return;
    setTicker(value.toUpperCase());
  };

  return (
    <section className="px-[360px] ">
      <form className="flex justify-center pt-10 mb-4" onSubmit={handleSubmit}>
        <label htmlFor="ticker">Ticker:</label>
        <input ref={inputRef} className="text-[#000]" id="ticker" type="text" />
        <button type="submit">Search</button>
      </form>
      <div className="flex flex-col gap-8 max-w-[1000px] ">
        <h3 className=" text-2xl mb-4 ">Spot: {`${ticker}/USDT`}</h3>
        {ticker === "" ? (
          "Please enter ticker"
        ) : (
          <OrderBookList ticker={ticker} exchanges={spotExchanges} />
        )}
        <div className="flex items-center">
          <div className=" min-w-[1000px]">
            <h3 className=" text-2xl mb-4 ">Futures: {`${ticker}/USDT`}</h3>
            {ticker === "" ? (
              "Please enter ticker"
            ) : (
              <OrderBookList ticker={ticker} exchanges={futuresExchanges} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Arbitration;

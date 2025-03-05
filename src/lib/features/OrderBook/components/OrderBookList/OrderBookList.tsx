import { IOrderBook } from "./OrderBookList.interface";

const OrderBookList = ({ ticker, exchanges }: IOrderBook) => {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {exchanges.map((ExchangeComponent, index) => (
        <ExchangeComponent key={index} ticker={ticker} />
      ))}
    </div>
  );
};

export default OrderBookList;

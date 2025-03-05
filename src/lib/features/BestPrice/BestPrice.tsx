import { useSelector } from "react-redux";

const test = (state) => state.tokenPrice.bestPrice;

const BestPrice = () => {
  const { bestBuy, bestSell } = useSelector(test);

  const pricePercentage = (buyPrice: number, sellPrice: number) => {
    if (!buyPrice && !sellPrice) return 0;
    return ((buyPrice - sellPrice) / sellPrice) * 100;
  };

  const roundToTenth = (num: number) => {
    if (!num) return 0;
    return Math.round(num * 10) / 10;
  };

  return (
    <div className="flex  gap-10">
      <div>
        <p> {bestSell.exchange}</p>
        <p>Sell: {bestSell.price}</p>
      </div>
      <div>
        <p>{bestBuy.exchange}</p>
        <p> Buy: {bestBuy.price}</p>
      </div>

      <div>
        <p>
          {roundToTenth(pricePercentage(bestBuy.price, bestSell.price)) || 0}%
        </p>
      </div>
    </div>
  );
};

export default BestPrice;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bestPrice: {
    bestBuy: {
      exchange: "",
      token: "",
      price: 0,
    },
    bestSell: {
      exchange: "",
      token: "",
      price: 0,
    },
  },
  exchangePriceList: [
    {
      id: "1",
      exchange: "Binance",
      token: "",
      sellPrice: 0,
      buyPrice: 0,
    },

    {
      id: "2",
      exchange: "Bybit",
      token: "",
      sellPrice: 0,
      buyPrice: 0,
    },
    {
      id: "3",
      exchange: "Okx",
      token: "",
      sellPrice: 0,
      buyPrice: 0,
    },
    {
      id: "4",
      exchange: "Mexc",
      token: "",
      sellPrice: 0,
      buyPrice: 0,
    },
    {
      id: "5",
      exchange: "Bitget",
      token: "",
      sellPrice: 0,
      buyPrice: 0,
    },
    {
      id: "6",
      exchange: "Gate",
      token: "",
      sellPrice: 0,
      buyPrice: 0,
    },
    {
      id: "7",
      exchange: "Huobi",
      token: "",
      sellPrice: 0,
      buyPrice: 0,
    },
    {
      id: "8",
      exchange: "BingX",
      token: "",
      sellPrice: 0,
      buyPrice: 0,
    },
    {
      id: "9",
      exchange: "Kukoin",
      token: "",
      sellPrice: 0,
      buyPrice: 0,
    },
  ],
};

const bestPriceSlice = createSlice({
  name: "tokenPrice",
  initialState,
  reducers: {
    updateTokenPrice(state, { payload }) {
      const { exchange, token, sellPrice, buyPrice } = payload;

      const exchangeIndex = state.exchangePriceList.findIndex(
        (item) => item.exchange === exchange
      );

      if (exchangeIndex !== -1) {
        // Если биржа найдена, проверяем тикер
        // if (state.exchangePriceList[exchangeIndex].token !== token) {
        //   state = initialState;
        // }
        // Обновляем данные биржи
        state.exchangePriceList[exchangeIndex].token = token;
        state.exchangePriceList[exchangeIndex].sellPrice = sellPrice;
        state.exchangePriceList[exchangeIndex].buyPrice = buyPrice;
      } else {
        // Добавляем новую запись для биржи
        state.exchangePriceList.push({
          id: `${state.exchangePriceList.length + 1}`,
          exchange,
          token,
          sellPrice,
          buyPrice,
        });
      }

      // Определяем биржу с лучшей ценой покупки
      const bestBuy = state.exchangePriceList.reduce(
        (best, current) => (current.buyPrice > best.buyPrice ? current : best),
        state.exchangePriceList[0]
      );

      // Определяем биржу с лучшей ценой продажи
      const bestSell = state.exchangePriceList.reduce(
        (best, current) =>
          current.sellPrice < best.sellPrice && current.sellPrice > 0
            ? current
            : best,
        state.exchangePriceList[0]
      );

      // Обновляем состояние `bestPrice` с двумя биржами
      state.bestPrice = {
        bestBuy: {
          exchange: bestBuy.exchange,
          token: bestBuy.token,
          price: bestBuy.buyPrice,
        },
        bestSell: {
          exchange: bestSell.exchange,
          token: bestSell.token,
          price: bestSell.sellPrice,
        },
      };
    },
  },
});

// const persistConfig = { key: "staff", storage, whitelist: ["staff"] };

// export const staffReducer = persistReducer(persistConfig, staffSlice.reducer);
export const bestPriceReducer = bestPriceSlice.reducer;

export const { updateTokenPrice } = bestPriceSlice.actions;

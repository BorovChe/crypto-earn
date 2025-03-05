import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const KUCOIN_FUTURES_API_URL = "https://api-futures.kucoin.com"; // URL для фьючерсов

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" }); // Запрещаем любые методы, кроме GET
  }

  try {
    // Запрос токена у KuCoin Futures API
    const response = await axios.post(
      `${KUCOIN_FUTURES_API_URL}/api/v1/bullet-public`
    );
    const data = response.data.data; // Получаем token и instanceServers
    res.status(200).json(data); // Возвращаем клиенту
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка получения токена KuCoin Futures:", error.message);
    } else {
      console.error("Неизвестная ошибка:", error);
    }
    res.status(500).json({ error: "Не удалось получить токен для фьючерсов" });
  }
}

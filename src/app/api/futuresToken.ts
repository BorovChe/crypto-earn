import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const KUCOIN_FUTURES_API_URL = "https://api-futures.kucoin.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await axios.post(
      `${KUCOIN_FUTURES_API_URL}/api/v1/bullet-public`
    );
    console.log(response);
    const data = response.data.data;
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка получения токена KuCoin Futures:", error.message);
    } else {
      console.error("Неизвестная ошибка:", error);
    }
    res.status(500).json({ error: "Не удалось получить токен для фьючерсов" });
  }
}

import axios from "axios";

export async function getWhitebitStaking() {
  try {
    const response = await axios(
      "https://internal.whitebit.com/v2/smart/flex-plans",
      {
        headers: {
          Origin: "https://whitebit.com",
          Referer: "https://whitebit.com/",
        },
      }
    );

    console.log(response.data);
    // console.log(
    //   response.data.data.allProducts.currencies[0].products[0].rate.rateNum
    // );
    // const data =
    //   response.data.data.allProducts.currencies[0].products[0].rate.rateNum;

    // const apy = data.value[0];

    // const updatedData = {
    //   coin: "USDT",
    //   apy: apy + "%",
    //   type: "flexible",
    //   exchange: {
    //     title: "Whitebit",
    //     link: "https://whitebit.com/earn/crypto-lending/create/flex/USDT",
    //   },
    // };

    // return updatedData;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Error");
  }
}

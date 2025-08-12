import Container from "@/components/UI/Container";
// import { getGateLauncpool } from "@/services/launchpools/gate";
import { getLaunchpoolList } from "@/services/launchpools/launchpool-list";
import Image from "next/image";

const LaunchpoolPage = async () => {
  const data = await getLaunchpoolList();
  console.log(data);

  if (!data) {
    return <div>Ошибка загрузки. Попробуйте позже</div>;
  }

  return (
    <section className="py-10">
      <Container>
        <h1 className="mb-4 text-xl text-left font-bold uppercase">
          Launchpools
        </h1>
        <ul className="flex justify-center items-center flex-col gap-4">
          {data.map((launchpool, i) => (
            <li key={i} className="flex gap-4">
              <p>{launchpool.exchange.title}</p>
              <p>{launchpool.coin}</p>
              <Image
                src={launchpool.icon}
                alt={launchpool.coin}
                width={30}
                height={30}
                className="rounded-full"
              />
              <p>{launchpool.endTime}</p>
              <ul className="flex gap-4">
                {launchpool.rewardsPool.map((rewards, i) => (
                  <li key={i} className="flex gap-4">
                    <p>{rewards.coin}</p>
                    <p>{rewards.apr}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default LaunchpoolPage;

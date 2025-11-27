import BgImage from "@/components/UI/BgImage";
import Container from "@/components/UI/Container";
import NavLink from "@/components/UI/NavLink";

export default function Home() {
  return (
    <section className="py-10 flex-1">
      <BgImage urlPath={"/images/background/bg-home.png"} />
      <Container>
        <h1 className="text-6xl uppercase font-bold mb-4">Crypto earn</h1>
        <p
          className="max-w-[800px] flex gap-4 items-center text-white mb-10
         before:block before:w-[60px] before:h-[1px] before:bg-white"
        >
          Це спосіб змусити свою криптовалюту приносити дохід, навіть коли ти не
          торгуєш.
        </p>
        <ul className="flex flex-col gap-10">
          <li className="flex gap-4 justify-between items-center">
            <NavLink href="activity" title="Activity" />
            <p className="max-w-[900px] text-center font-medium">
              Крипто-активності на біржі – це спеціальні події, де користувачі
              можуть отримати винагороду у вигляді токенів за виконання певних
              дій: торгівлю, участь у лотереях, стейкінг або інші активності.
            </p>
          </li>
          <li className="flex gap-4 justify-between items-center">
            <NavLink href="arbitration" title="Arbitration" />
            <p className="max-w-[900px] text-center font-medium">
              Арбітраж крипти — це стратегія заробітку на різниці цін одного й
              того ж криптоактиву між різними біржами.
            </p>
          </li>
          <li className="flex gap-4 justify-between items-center">
            <NavLink href="staking" title="Staking" />
            <p className="max-w-[900px] text-center font-medium">
              Стейкінг криптовалюти — це процес блокування токенів у
              блокчейн-мережі для участі в її роботі та забезпечення безпеки, за
              що учасник отримує винагороду у вигляді додаткових токенів або
              відсотків.
            </p>
          </li>
          <li className="flex gap-4 justify-between items-center">
            <NavLink href="launchpools" title="launchpools" />
            <p className="max-w-[900px] text-center font-medium">
              Лаунчпули — це спеціальні платформи або програми на біржах, де
              користувачі можуть ставити свої криптоактиви (токени) для
              отримання нових токенів проектів, які тільки виходять на ринок.
            </p>
          </li>
        </ul>
      </Container>
    </section>
  );
}

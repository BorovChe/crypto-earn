import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="w-[300px] absolute top-0 left-0">
      <ul className="flex flex-col justify-center items-center">
        <li>
          <Link href="/activity/">Hot Activity 🔥</Link>
        </li>
        <li>
          <Link href="/activity/bybit">Bybit</Link>
        </li>
        <li>
          <Link href="/activity/mexc">Mexc</Link>
        </li>
        <li>
          <Link href="/activity/binance">Binance</Link>
        </li>
        <li>
          <Link href="/activity/gate">Gate</Link>
        </li>
        <li>
          <Link href="/activity/bitget">Bitget</Link>
        </li>
        <li>
          <Link href="/activity/okx">Okx</Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;

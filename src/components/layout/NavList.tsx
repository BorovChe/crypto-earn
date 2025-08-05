import Link from "next/link";
import navList from "@/static-data/nav-list.json";

export interface INavListProps {
  textColor: string;
  textSize: string;
}

const NavList = ({ textColor, textSize }: INavListProps) => {
  return (
    <nav className="block">
      <ul className="flex gap-8 items-center">
        {navList.map(({ id, title }) => (
          <li
            key={id}
            className="hover:scale-[1.1] transition-transform duration-[--main-transition]"
          >
            <Link
              style={{ fontSize: textSize }}
              className={`text-[${textColor}] leading-tight tracking-widest	 uppercase lg:text-[${textSize}] `}
              href={`/${id}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;

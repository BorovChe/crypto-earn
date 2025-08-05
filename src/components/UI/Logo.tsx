import Link from "next/link";
export interface ILogoProps {
  textColor: string;
  textSize: string;
}

const Logo = ({ textColor, textSize }: ILogoProps) => {
  return (
    <Link
      href="/"
      className={`absolute top-1/2 left-2/4	translate-y-[-50%] translate-x-[-50%] block text-[${textColor}]   leading-none tracking-[.18em] text-center uppercase hover:scale-[1.1] transition-transform duration-[--main-transition]`}
    >
      <p style={{ fontSize: textSize }} className="mb-[3px] font-medium">
        Crypto Earn
      </p>
      <span className="text-[8px]">Money should make money</span>
    </Link>
  );
};

export default Logo;

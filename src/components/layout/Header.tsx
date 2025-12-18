// import Image from "next/image";
import Logo from "../UI/Logo";
import NavList from "./NavList";

const Header = () => {
  return (
    <header
      className="blur-filter relative top-0 w-full flex items-center min-h-[64px]
       shadow-[0_4px_12px_#191c2666] border-[--header-border-cl-20] border-b-[0.1px] border-solid  z-[999] px-5
       sm:px-8"
    >
      <div className="w-full flex justify-between gap-8">
        {/* <button
          type="button"
          className="xl:hidden flex items-center justify-center w-10 h-10"
          // onClick={toggleSidebar}
        >
          <Image
            // src={isOpen ? close : burgerMenu}
            src="/icons/header/menu.svg"
            alt="Menu"
            width={30}
            height={30}
          />
        </button> */}
        <NavList textColor="--main-white-txt-cl" textSize="14px" />
        <Logo textColor="--main-white-txt-cl" textSize="18px" />
      </div>
    </header>
  );
};

export default Header;

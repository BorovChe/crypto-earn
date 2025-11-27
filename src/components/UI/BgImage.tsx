import Image from "next/image";

const BgImage = ({ urlPath }: { urlPath: string }) => {
  return (
    <>
      <Image
        src={urlPath}
        alt="Background"
        fill
        priority
        quality={100}
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/10 -z-10" />
    </>
  );
};

export default BgImage;

import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="absolute right-[50%] top-[50%] translate-x-[50%] translate-y-[50%]">
      <Image src={"/loader.svg"} alt="loader" width={36} height={36} />
    </div>
  );
};

export default loading;

import React from "react";
import { LoaderIcon } from "react-hot-toast";

const Spinner = () => {
  return (
    <LoaderIcon height={20} width={20} />
    // <div
    //   class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
    //   role="status"
    //   aria-label="loading"
    // ></div>
  );
};

export default Spinner;

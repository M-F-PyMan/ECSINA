import React from "react";
import Button from "../UI/Button";

const HeaderLink = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-10 px-10">
      <h2 className="text-[min(10vw,30px)] text-center">
        اکسینا دستیاری حرفه‌ای، همیشه همراه کسب و کار شما است. دغدغه‌ی ما هموار
        کردن مسیر شماست.
      </h2>
      <Button icon={"/assets/icons/Arrow.svg"}>آشنایی بیشتر</Button>
    </div>
  );
};

export default HeaderLink;

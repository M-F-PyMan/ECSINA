import Document from "@/components/user/Document";
import DocumentSlider from "@/components/user/DocumentSlider";
import Title from "@/components/user/Title";
import { cards } from "@/components/user/userDb";
import React from "react";

function page() {

  return (


    <>
      <div className="mt-[40px]">
       <Title title={'اسناد'}/>
        <div className="px-[20px] py-[30px] md:p-0 bg-[#6B9DFF33] md:bg-transparent h-fit ">
          <div className="md:hidden grid grid-cols-12 w-full gap-[10px]">
            {cards.slice(0, 5).map((c) => (
              <div key={c.id} className="col-span-12 sm:col-span-6">
                <Document {...c} />
              </div>
            ))}
          </div>
        </div>

     
        <div className="hidden md:flex container mx-auto h-full">
          <DocumentSlider />
        </div>
      </div>
    </>
  );
}

export default page;


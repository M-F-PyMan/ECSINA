import React from "react";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";

function ProposalTable({ data: proposalData }) {
  const deleteProposalHandler = async () => {
    console.log("delete icons");
  };

  return (
    <div className="overflow-x-auto rounded-2xl">
      <table className="table border-separate border-spacing-y-1">
        {/* head */}
        <thead>
          <tr className="bg-[#ECE9EC] text-black cursor-default   text-center font-semibold">
            <th className="hover:underline  py-4 text-start   cursor-pointer">عنوان پروپوزال</th>
            <th className="hover:underline  py-4 text-start  cursor-pointer">توضیحات پروپوزال</th>
            <th className="hover:underline  py-4 text-start   cursor-pointer">تاریخ انتشار</th>
            <th className="py-4 ">عملیات</th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {proposalData &&
            proposalData.map((item) => (
              <tr key={item.id} className="overflow-x-hidden py-2 whitespace-nowrap text-center font-normal hover:bg-[#E8E8E8] bg-[#F5F4F5] transition-colors">
                <td className="text-start">
                  <p>{item.title}</p>
                </td>
                <td className="text-justify ">لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم</td>
                <td className="text-start">
                  {item.date.toLocaleDateString("fa-IR", {
                    hour: "numeric",
                    minute: "2-digit",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td className="flex items-center justify-center gap-x-2">
                  <LinkButton link={`/admin/proposal/${item.id}`} className="border-1 bg-white p-1 border-transparent hover:border-black rounded-full cursor-pointer transition-colors">
                    <Image src={"/icons/edit2.svg"} width={23} height={23} alt="" />
                  </LinkButton>
                  <button className="border-1 p-1 bg-white border-transparent hover:border-danger rounded-full cursor-pointer transition-colors">
                    <Image src={"/icons/trash-x.svg"} width={25} height={25} alt="" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProposalTable;

"use client";
import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Button from "../UI/Button";
import Breadcrumb from "../UI/Breadcrumb"; // اضافه شد
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiDownload, BiImage } from "react-icons/bi";

const tabs = [
  { id: 1, title: "فیلم آموزشی", key: "videos", fileField: "video_file" },
  { id: 2, title: "کتابچه راهنما", key: "guidebooks", fileField: "guidebook_file" },
  { id: 3, title: "نقشه راه یادگیری", key: "roadmaps", fileField: "roadmap_file" },
  { id: 4, title: "فایل مثال", key: "samples", fileField: "sample_file" },
];

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
    },
  }).then((res) => res.json());

export default function ProductDetails({ proposalId }) {
  const [activeTab, setActiveTab] = useState(1);

  // گرفتن داده از بک‌اند
  const { data, error, isLoading } = useSWR(
    `http://10.1.192.2:8000/api/proposals/${proposalId}/`,
    fetcher
  );

  if (error) return <div>خطا در بارگذاری جزئیات محصول...</div>;
  if (isLoading) return <div>در حال بارگذاری...</div>;

  const currentItems = data[tabs[activeTab - 1].key] || [];

  // تابع دانلود امن
  const handleDownloadTemplate = async () => {
    try {
      const res = await fetch(
        `http://10.1.192.2:8000/suggestion/proposals/${proposalId}/download/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
          },
        }
      );
      const json = await res.json();
      if (res.ok && json.download_url) {
        window.location.href = json.download_url;
      } else {
        alert(json.detail || "اجازه دانلود ندارید.");
      }
    } catch {
      alert("خطا در ارتباط با سرور");
    }
  };

  return (
    <div className="container mt-4 md:mt-14">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "خانه", url: "/" },
          { label: data.category_name, url: `/categories/${data.category}` },
          { label: data.title },
        ]}
      />

      <div className="bg-secondary-2 border border-primary-7 rounded-[10px] md:rounded-4xl px-2 md:px-12 md:pb-11 md:pt-16 pb-2 pt-5">
        {/* Header */}
        <div className="flex items-center justify-center md:justify-between">
          <p className="text-black font-bold text-xs md:text-3xl">
            {data.title || "عنوان قالب"}
          </p>
          <div className="hidden md:flex items-center gap-9">
            <span className="flex items-center gap-2">
              <AiOutlineShareAlt fill="#0018BC" className="w-8 h-8" />
              <p className="text-primary-7 text-lg">{data.sold_count} دانلود</p>
            </span>
            <span className="flex items-center gap-2">
              <BiDownload fill="#0018BC" className="w-8 h-8" />
              <p className="text-primary-7 text-lg">{data.sold_count} دانلود</p>
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-3">
          <div className="bg-primary-0 flex justify-between rounded-t-[10px] md:rounded-t-4xl ">
            <div className="flex items-center">
              {tabs.map((tab) => (
                <span
                  onClick={() => setActiveTab(tab.id)}
                  key={tab.id}
                  className={`px-1.5 md:px-5 md:py-4 py-3 text-[10px] md:text-[18px] font-semibold cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-primary-8 text-white"
                      : "bg-transparent text-primary-7"
                  }`}
                >
                  {tab.title}
                </span>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-1 ml-5">
              {(data.images || []).slice(0, 4).map((img) => (
                <BiImage key={img.id} className="w-9 h-9" fill="#0029BC" />
              ))}
            </div>
          </div>

          {/* Preview area */}
          <div className="relative w-full h-40 md:h-72 xl:h-96">
            <Image
              src={data.preview_image || "/assets/images/NotFound.png"}
              alt=""
              fill
            />
          </div>
        </div>

        {/* Items in current tab */}
        <div className="mt-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentItems.map((item) => (
              <li key={item.id} className="bg-white rounded-xl p-4 shadow">
                <p className="font-semibold">{item.title}</p>
                <a
                  className="text-blue-700 underline"
                  href={item[tabs[activeTab - 1].fileField]}
                  target="_blank"
                  rel="noreferrer"
                >
                  مشاهده
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Download button */}
        <div>
          <Button className="w-full text-center" onClick={handleDownloadTemplate}>
            دانلود قالب
          </Button>
        </div>
      </div>
    </div>
  );
}

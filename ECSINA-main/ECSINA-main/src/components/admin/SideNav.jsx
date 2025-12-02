"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const sideNavLinks = [
  {
    id: 1,
    title: "پروپوزال ها",
    icon: "/icons/admin-proposal.svg",
    link: "/admin/proposal",
  },
  {
    id: 2,
    title: "مدیریت دسته بندی ها ",
    icon: "/icons/admin_category.svg",
    link: "/admin/category",
  },
];
const SideNav = () => {
  const path = usePathname();
  const router = useRouter();
  const logOutHandler = () => {
    console.log("Logout");
    router.push("/");
  };

  return (
    <div className="w-full h-full col-span-3 flex flex-col justify-between bg-[#3E243C]">
      <div>
        <div className="pt-7 pr-7 mb-12">
          <h2 className="font-black text-2xl">اکسینا</h2>
        </div>
        <ul className="space-y-2">
          {sideNavLinks.map((item) => {
            return (
              <li key={item.id} className={`py-3 pl-2 pr-8 cursor-pointer plum-gradient-hover  transition-all ease-linear ${path == item.link ? "plum-gradient" : "plum-gradient-hover"}  `}>
                <Link className="flex items-center gap-x-2" href={item.link}>
                  <Image alt="" src={item.icon} width={20} height={20} />
                  <p>{item.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button onClick={() => document.getElementById("logout").showModal()} className="flex btn items-center self-start mr-8 mb-4  bg-transparent shadow-none border-none  gap-x-2 cursor-pointer">
        <Image alt="" src={"/icons/Logout.svg"} width={20} height={20} />
        <p className="font-xl font-normal">خروج از حساب</p>
      </button>

      <dialog id="logout" className="modal">
        <div className="modal-box w-[30%] bg-secondary-background text-title">
          <h1 className="font-bold text-lg flex items-center justify-between mb-14">
            <p className="font-bold text-title text-2xl">خروج از حساب کاربری</p>
            <button onClick={() => document.querySelector("#logout").close()} className="btn  bg-transparent border-none shadow-none">
              <Image src={"/icons/x.svg"} width={15} height={15} alt="x" />
            </button>
          </h1>

          <form method="dialog" className="modal-backdrop relative flex flex-col">
            <p className="text-title">آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟</p>

            <div className="w-full flex gap-3 mt-12">
              <button className=" bg-transparent   w-1/2 p-3 rounded-[20px] text-border border-2 border-border">بازگشت</button>
              <button onClick={() => logOutHandler()} className="bg-danger hover:bg-danger-dark w-1/2 p-3 rounded-[20px] text-white">
                خروج از حساب
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SideNav;

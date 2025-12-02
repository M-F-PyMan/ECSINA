import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoClose } from "react-icons/io5";

const SignupPage = () => {
  return (
    <main className="flex flex-col justify-evenly md:justify-center items-center z-0 w-screen  h-screen relative">
      <div className="flex-col   md:hidden text-white items-center z-10 ">
        <h1 className="text-xl text-center">سلام!</h1>
        <p className="mt-3  text-xl">
          به&nbsp;
          <Link className="p-0.5" href={"/"}>
            اکسینا
          </Link>
          خوش آمدید.
        </p>
      </div>
      {/* Image background mobile responsive */}
      <div className="w-full md:hidden h-[250px] absolute z-0 top-0">
        <Image alt="" src={"/assets/images/sign-up.png"} fill />
      </div>
      {/* Heade of Auth Card */}
      <section className="w-2/3 h-fit relative bg-white z-10  blue_shadow  rounded-xl p-4 flex flex-col items-center justify-start ">
        <div className="w-full flex justify-end md:justify-between  items-start  z-40">
          <div className="relative  size-12 md:size-21">
            <Image src={"/assets/icons/Logo.svg"} alt="Logo" fill />
          </div>
          <div className="hidden md:flex items-center justify-start md:flex-col">
            <h1 className="text-5xl">سلام!</h1>
            <p className="mt-3 font-semibold text-2xl">
              به&nbsp;
              <Link className="p-1 text-primary-7" href={"/"}>
                اکسینا
              </Link>
              خوش آمدید.
            </p>
          </div>
          <Link href={"/"} className="p-6 absolute  -top-32 left-[-25%] md:left-0 md:top-0 md:relative">
            <IoClose className="md:text-black  text-white hover:opacity-60" size={25} />
          </Link>
        </div>

        <SignupForm />
      </section>
    </main>
  );
};

export default SignupPage;

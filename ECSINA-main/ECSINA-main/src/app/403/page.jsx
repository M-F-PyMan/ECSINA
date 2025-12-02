import Button from "@/components/UI/Button";
import Image from "next/image";
import Link from "next/link";

function ForbiddenPage() {
  return (
    <body>
      <main className="flex flex-col md:flex-row  h-screen w-screen items-center justify-center gap-5">
        <div className="w-[300px] md:w-[590px] h-[226px] md:h-[440px] object-contain relative flex items-center justify-center">
          <Image src={"/assets/icons/MainLogo.svg"} alt="Main Logo" fill className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col gap-0 h-fit md:border-r-4 pr-3 border-r-black justify-start items-center md:items-start p-1  ">
          <h1 className="md:text-9xl text-5xl">403</h1>
          <p className="text-center md:-mt-6 text-2xl font-semibold">شما اجازه دسترسی به این بخش را ندارید.</p>
          <Button className="mt-6">
            <Link href="/" className="">
              بازگشت به صفحه اصلی
            </Link>
          </Button>
        </div>
      </main>
    </body>
  );
}

export default ForbiddenPage;

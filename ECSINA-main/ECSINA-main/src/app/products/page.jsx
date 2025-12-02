import MainLayout from "@/components/layout/MainLayout";
import AllCategories from "@/components/products/AllCategories";
import SearchInput from "@/components/UI/SearchInput";
import AllProducts from "@/components/products/AllProducts";
import GuideModal from "./GuideModal";

export default function ProductsPage() {
  return (
    <MainLayout>
      <section className="gradient-main-background mt-4 md:mt-16 ">
        <div className="container pb-16 pt-8 md:pb-[110px]">
          {/* Header */}
          <div className="flex items-center justify-between gap-6">
            <SearchInput placeholder={"جست و جو ..."} />
            <GuideModal />
          </div>
          {/* Categories */}
          <div className=" mt-16 md:mt-30">
            <h3 className="text-black text-base md:text-4xl font-bold flex items-center justify-center">دسته‌بندی محصولات</h3>
            <AllCategories />
          </div>
          {/* Products */}
          <div className=" mt-16 md:mt-30">
            <h3 className="text-black text-base md:text-4xl font-bold flex items-center justify-center">جدیدترین قالب‌ها</h3>
            <AllProducts />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

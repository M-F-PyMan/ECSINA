import MainLayout from "@/components/layout/MainLayout";
import Breadcrumb from "@/components/products/Breadcrumb";
import ProductDetails from "@/components/products/ProductDetails";
import FrequentlyQuestions from "@/components/products/FrequentlyQuestions";
import RecommendedProducts from "@/components/UI/RecommendedProducts";
import AboutProduct from "@/components/products/AboutProduct";
import CreateComment from "@/components/products/CreateComment";

export const metadata = {
  title: "صفحه محصول | اکسینا",
  description: "صفحه محصول | اکسینا",
};

export default function ProductPage({ params }) {
  return (
    <MainLayout>
      <section className="gradient-main-background min-h-screen pb-5">
        {/* <Breadcrumb /> */}
        <ProductDetails />
        <AboutProduct />
        <FrequentlyQuestions />
        <CreateComment />
        <RecommendedProducts />
      </section>
    </MainLayout>
  );
}

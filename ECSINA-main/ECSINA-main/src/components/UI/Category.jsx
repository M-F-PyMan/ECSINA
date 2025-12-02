import Image from "next/image";

const Category = ({ category }) => {
  return (
    <div className="md:flex md:flex-col md:gap-9 md:min-w-[240px]  md:border md:border-primary-7 md:p-10 md:pb-16 md:rounded-4xl md:bg-secondary-2 md:hover:shadow-2xl  transition-all duration-300 cursor-pointer">
      <div className="px-4.5 min-w-32 md:px-8 md:py-7 rounded-md gradient-cart-icon flex flex-col gap-2 items-center justify-center min-h-24">
        <div className="relative w-9 h-9 md:w-16 md:h-16 ">
          <Image fill src={category.icon} alt={category.title} />
        </div>

        <p className="block md:hidden text-white text-center text-sm font-semibold">
          {category.title}
        </p>
      </div>
      <p className="hidden md:block text-center text-black text-2xl font-bold">
        {category.title}
      </p>
    </div>
  );
};

export default Category;

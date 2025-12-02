import MyAccordion from "../UI/MyAccordion";

const FrequentlyQuestions = () => {
  return (
    <div className="container">
      <div className="border border-primary-7 rounded-[10px]  md:rounded-4xl shadow-product-cart mt-16 md:mt-48">
        {/* Header */}
        <div className="bg-primary-0 rounded-t-[10px] md:rounded-t-4xl py-2 md:py-4 ">
          <span className="bg-primary-8 rounded-tr-[7px] md:rounded-tr-4xl px-2 md:px-5 py-[13px] md:py-4  text-white text-[10px] md:text-[18px] font-semibold">
            سوالات متدوال
          </span>
        </div>

        {/* Body */}
        <div className="px-4 md:px-14 pt-3 md:pt-9 pb-6">
          <MyAccordion allowMultiple={false} />
        </div>
      </div>
    </div>
  );
};

export default FrequentlyQuestions;

import Image from "next/image";

const TemplateFeature = ({ feature }) => {
  return (
    <div
      className="flex flex-col items-start md:items-center bg-secondary-2 gap-3 md:gap-5 rounded-2xl p-4 md:p-8 border-secondary-8 md:shadow-feature-cart 
      border border-t-0 md:border-t even:border-l-0  md:even:border-l odd:border-r-0  md:odd:border-r hover:scale-102 transition-all duration-400"
    >
      <div className="relative w-8 h-8 md:w-12 md:h-12">
        <Image src={feature.icon} alt={feature.title} fill />
      </div>
      <h5 className="text-sm md:text-2xl font-semibold">{feature.title}</h5>
      <p className="text-xs md:text-xl font-normal md:text-center">{feature.description}</p>
    </div>
  );
};

export default TemplateFeature;

import Service from "../UI/Service";

const allProducts = [
  {
    title: "بیزنس مدل",
    description: "انواعی از بیزنس مدل ها که نشان می‌دهد یک کسب‌وکار چگونه ارزش ایجاد می‌کند.",
    icon: "/assets/icons/Status1.svg",
    id: 1,
  },
  {
    title: "بوم کسب و کار",
    description: "یکی از ابزار های مدیریت استراتژیک برای تجزیه و تحلیل و بهینه سازی مدل های کسب و کار است ",
    icon: "/assets/icons/Computer.svg",
    id: 2,
  },
  {
    title: "پروپوزال ها",
    description: "انواعی از اسناد رسمی که برای ارائه ایده ها پروژه‌ها یا پیشنهادات به افراد، سازمان‌ها یا سرمایه‌گذاران تهیه شده اند.",
    icon: "/assets/icons/Document.svg",
    id: 3,
  },
  {
    title: "بیزنس پلن",
    description: "انواعی از سند های مکتوب  که اهداف، استراتژی‌ها، بازار هدف و برنامه‌های عملیاتی یک کسب‌وکار را مشخص می‌کند.",
    icon: "/assets/icons/Status2.svg",
    id: 4,
  },
  {
    title: "بوم ناب",
    description: "یکی از بهترین ابزار های مدل سازی کسب و کار که مخصوص استارتاپ ها و کسب و کار های نوپا طراحی شده است ",
    icon: "/assets/icons/Status3.svg",
    id: 5,
  },
];

const OurServices = () => {
  return (
    <section className="mt-20  container">
      <h5 className=" text-xl md:text-4xl text-black font-bold text-center">محصولات ما</h5>
      <div className="mt-8 md:mt-20 flex items-center gap-4 justify-center md:justify-evenly flex-wrap ">
        {
          allProducts.map((product, index) => {
            const positions = [
              "top-[40%] left-[5%] translate-y-10",  
              "top-[0%] left-[50%] -translate-y-5",
              "top-[40%] right-[5%] translate-y-6",  
              "bottom-[0%] left-[20%] translate-y-12", 
              "bottom-[0%] right-[20%] translate-y-6" 
            ];
            return (
              <div key={product.id} className={`${index % 2 === 0 ? "md:mt-32" : ""} ${positions[index]}`}>
                <Service product={product} />
              </div>
            )
          })}
      </div>
    </section>
  );
};
 
export default OurServices;
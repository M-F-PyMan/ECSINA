import Image from 'next/image'
import React from 'react'

const Title = ({title}) => {
  return (
   <div className="mb-[24px] md:mb-[60px] flex justify-between items-center md:justify-center mt-[40px]  container mx-auto h-full">
            <h3 className="font-iransans font-bold md:font-semibold text-[16px] md:text-[30px] text-center ">
              {title}
            </h3>
            <button className="block md:hidden">
              <Image
                src={"/assets/icons/chevron-left.svg"}
                alt="icon"
                width={15}
                height={15}

              />
            </button>
          </div>
  )
}

export default Title
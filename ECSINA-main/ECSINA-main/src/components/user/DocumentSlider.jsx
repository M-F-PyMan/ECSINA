'use client'

import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { cards } from "./userDb"
import Document from "./Document"

const DocumentSlider = () => {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slides: { perView: 1, spacing: 5 }, 
    loop: true, 
  })

  return (
    <div ref={sliderRef} className="keen-slider py-[10px]!   ">
      {cards.map((c) => (
       
          <Document key={c.id} {...c} />
        
      ))}
    </div>
  )
}

export default DocumentSlider

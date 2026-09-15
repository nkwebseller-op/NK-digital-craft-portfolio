import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Honest brand statements — no fabricated client testimonials.
// These are the guiding principles of NK Digital Craft and its team.
const testimonialData = [
  {
    image: "/t-avt-1.png",
    name: "Nikhil Kumar Singh",
    position: "Founder & CEO — NK Digital Craft",
    message:
      "We build practical digital solutions — websites, AI and automation — designed around real business requirements. Our goal is to help every business we work with reach the right customers and grow online.",
  },
  {
    image: "/t-avt-2.png",
    name: "Priyaranjan Sahoo",
    position: "Company Manager — NK Digital Craft",
    message:
      "From the first conversation to the final launch, we focus on clarity, quality and long-term support. Every project is treated as a partnership — not just a delivery.",
  },
  {
    image: "/t-avt-3.png",
    name: "U. Shiva",
    position: "Client Coordination — NK Digital Craft",
    message:
      "Communication is at the heart of what we do. We stay in touch on WhatsApp, understand your business, and make sure every requirement is captured before we build.",
  },
];

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-[400px]"
    >
      {testimonialData.map((person, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center md:flex-row gap-x-8 h-full px-16">
            {/* avatar, name, position */}
            <div className="w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
              <div className="flex flex-col justify-center text-center">
                {/* avatar */}
                <div className="mb-2 mx-auto">
                  <Image
                    src={person.image}
                    width={100}
                    height={100}
                    alt={person.name}
                  />
                </div>

                {/* name */}
                <div className="text-lg">{person.name}</div>

                {/* position */}
                <div className="text-[12px] uppercase font-extralight tracking-widest">
                  {person.position}
                </div>
              </div>
            </div>

            {/* quote & message */}
            <div className="flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20">
              {/* quote icon */}
              <div className="mb-4">
                <FaQuoteLeft
                  className="text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0"
                  aria-hidden
                />
              </div>

              {/* message */}
              <div className="xl:text-lg text-center md:text-left">
                {person.message}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;

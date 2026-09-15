import {
  RxDesktop,
  RxRocket,
  RxCode,
  RxLightningBolt,
  RxMagicWand,
  RxArrowTopRight,
} from "react-icons/rx";
import { FaRobot, FaSearchengin, FaBullhorn, FaMobileAlt } from "react-icons/fa";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const serviceData = [
  {
    Icon: RxDesktop,
    title: "AI Website Development",
    description:
      "AI-powered, professional business websites — custom-coded, responsive and built around real business needs.",
  },
  {
    Icon: RxCode,
    title: "Full Stack Development",
    description:
      "Custom web applications, business apps, landing pages and e-commerce websites — hand-coded and scalable.",
  },
  {
    Icon: RxMagicWand,
    title: "UI/UX & Branding",
    description:
      "Website design, UI/UX, logo design, graphic design and complete brand identity for businesses.",
  },
  {
    Icon: FaSearchengin,
    title: "SEO & Google Ranking",
    description:
      "SEO, Local SEO and Google ranking strategies that help local businesses get discovered online.",
  },
  {
    Icon: FaBullhorn,
    title: "Digital Marketing & Ads",
    description:
      "Marketing strategy, advertising and campaign management to reach the right customers and grow revenue.",
  },
  {
    Icon: FaRobot,
    title: "AI Agents & Automation",
    description:
      "AI agents, AI integration, business automation and prompt engineering for smarter, faster operations.",
  },
  {
    Icon: FaMobileAlt,
    title: "App Development",
    description:
      "Business applications and custom digital solutions built for real workflows and measurable outcomes.",
  },
  {
    Icon: RxLightningBolt,
    title: "Website Maintenance",
    description:
      "Website redesign, ongoing maintenance and technical support to keep your digital presence sharp.",
  },
  {
    Icon: RxRocket,
    title: "Business Growth Solutions",
    description:
      "AI-powered business growth consulting and full stack digital solutions for local businesses and startups.",
  },
];

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="h-[240px] sm:h-[340px]"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="bg-[rgba(30,58,138,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(37,99,235,0.20)] transition-all duration-300">
            {/* icon */}
            <div className="text-4xl text-accent mb-4">
              <item.Icon aria-hidden />
            </div>

            {/* title & description */}
            <div className="mb-8">
              <div className="mb-2 text-lg">{item.title}</div>
              <p className="max-w-[350px] leading-normal">{item.description}</p>
            </div>

            {/* arrow */}
            <div className="text-3xl">
              <RxArrowTopRight
                className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"
                aria-hidden
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;

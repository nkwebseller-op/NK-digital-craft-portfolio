import Link from "next/link";

import {
  RiInstagramLine,
  RiFacebookLine,
  RiGithubLine,
  RiWhatsappLine,
  RiMailLine,
} from "react-icons/ri";

export const socialData = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/nk_digital_craft/",
    Icon: RiInstagramLine,
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/share/1FGSVB2Zfp/",
    Icon: RiFacebookLine,
  },
  {
    name: "WhatsApp",
    link: "https://wa.me/918260999311",
    Icon: RiWhatsappLine,
  },
  {
    name: "Email",
    link: "mailto:nkbusinessout@gmail.com",
    Icon: RiMailLine,
  },
  {
    name: "Github",
    link: "https://github.com/nkwebseller-op",
    Icon: RiGithubLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-[5px] hover:text-white"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;

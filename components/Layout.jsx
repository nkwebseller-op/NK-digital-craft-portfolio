import { Sora } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";

// setup font
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  const router = useRouter();
  const isContact = router.pathname === "/contact";

  return (
    <main
      className={`${isContact ? "page-contact" : "page"} bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      {/* metadata */}
      <Head>
        <title>Nikhil Kumar Singh — Founder & CEO | NK Digital Craft</title>
        <meta
          name="description"
          content="Nikhil Kumar Singh — Founder & CEO of NK Digital Craft. AI Website Creator and Full Stack Digital Solutions Provider offering website development, AI websites, UI/UX, SEO, digital marketing, automation and custom digital solutions."
        />
        <meta
          name="keywords"
          content="NK Digital Craft, Nikhil Kumar Singh, AI Website Creator, Full Stack Developer, Website Development, AI Automation, SEO, Local SEO, Digital Marketing, UI/UX, Puri, Odisha, India"
        />
        <meta name="author" content="Nikhil Kumar Singh" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}
    </main>
  );
};

export default Layout;

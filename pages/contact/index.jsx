import { motion } from "framer-motion";
import { useState } from "react";
import { BsArrowRight, BsCheckCircleFill } from "react-icons/bs";
import { RiWhatsappLine, RiMailLine } from "react-icons/ri";

import { fadeIn } from "../../variants";

const SERVICES = [
  "AI Website Development",
  "Full Stack Web Development",
  "UI/UX Design & Branding",
  "SEO & Google Ranking",
  "Digital Marketing & Ads",
  "AI Agents & Automation",
  "App Development",
  "Website Maintenance & Support",
  "Business Growth Solutions",
  "Other / General Enquiry",
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    subject: "",
    services: [],
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (svc) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({
          name: "", email: "", phone: "", company: "",
          address: "", subject: "", services: [], message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isLoading = status === "loading";

  return (
    <div className="h-full bg-primary/30 overflow-y-auto">
      <div className="container mx-auto py-32 text-center xl:text-left flex items-start justify-center min-h-full">
        <div className="flex flex-col w-full max-w-[760px]">

          {/* heading */}
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-4"
          >
            Let&apos;s <span className="text-accent">connect.</span>
          </motion.h2>

          {/* primary contact links */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-sm"
          >
            <a
              href="https://wa.me/918260999311"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-x-2 hover:text-accent transition-all duration-300"
            >
              <RiWhatsappLine className="text-xl" aria-hidden />
              +91 8260999311
            </a>
            <span className="hidden sm:block text-white/30">|</span>
            <a
              href="mailto:nkbusinessout@gmail.com"
              className="flex items-center gap-x-2 hover:text-accent transition-all duration-300"
            >
              <RiMailLine className="text-xl" aria-hidden />
              nkbusinessout@gmail.com
            </a>
          </motion.div>

          {/* success state */}
          {status === "success" ? (
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center gap-4 py-16 text-center"
            >
              <BsCheckCircleFill className="text-5xl text-accent" />
              <h3 className="text-2xl font-semibold text-white">Message Sent!</h3>
              <p className="text-white/60 max-w-[400px]">
                Thank you for reaching out. NK Digital Craft will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 btn rounded-full border border-accent text-accent px-8 hover:bg-accent hover:text-white transition-all duration-300"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-5 w-full"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              {/* Row 1 — name + email */}
              <div className="flex flex-col sm:flex-row gap-5">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  className="input flex-1"
                  required
                  disabled={isLoading}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  className="input flex-1"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Row 2 — phone + company */}
              <div className="flex flex-col sm:flex-row gap-5">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone / WhatsApp"
                  className="input flex-1"
                  disabled={isLoading}
                />
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company / Business Name"
                  className="input flex-1"
                  disabled={isLoading}
                />
              </div>

              {/* Row 3 — address */}
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="City / Address"
                className="input"
                disabled={isLoading}
              />

              {/* Row 4 — subject */}
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject / Reason *"
                className="input"
                required
                disabled={isLoading}
              />

              {/* Services multi-select */}
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[2px] text-white/40 text-left">
                  Select Services (choose all that apply)
                </p>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((svc) => {
                    const active = form.services.includes(svc);
                    return (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => toggleService(svc)}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                          active
                            ? "bg-accent border-accent text-white font-medium"
                            : "border-white/20 text-white/50 hover:border-accent/60 hover:text-white/80"
                        }`}
                      >
                        {active && <span className="mr-1">✓</span>}
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project or requirements *"
                className="textarea"
                required
                disabled={isLoading}
              />

              {/* error */}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center -mt-2">
                  Something went wrong. Please try WhatsApp or email directly.
                </p>
              )}

              {/* Submit */}
              <div className="flex items-center justify-center xl:justify-start">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn rounded-full border border-white/50 px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group min-w-[150px]"
                >
                  {isLoading ? (
                    <span className="text-sm text-white/60 animate-pulse">Sending…</span>
                  ) : (
                    <>
                      <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                        Let&apos;s talk
                      </span>
                      <BsArrowRight
                        className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]"
                        aria-hidden
                      />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Contact;

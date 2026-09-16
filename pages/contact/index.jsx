import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BsArrowRight, BsCheckCircleFill } from "react-icons/bs";
import { HiChevronDown, HiX } from "react-icons/hi";
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
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [serviceError, setServiceError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (svc) => {
    setServiceError(false);
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }));
  };

  const removeService = (svc) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== svc),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.services.length === 0) {
      setServiceError(true);
      setShowServicesModal(true);
      return;
    }
    setServiceError(false);
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
    <div className="w-full bg-primary/30">
      <div className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 xl:pt-32 pb-[180px] xl:pb-20 text-center xl:text-left flex items-start justify-center">
        <div className="flex flex-col w-full max-w-[760px]">

          {/* heading */}
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-4 text-[28px] sm:text-[35px] xl:text-[54px]"
          >
            Let&apos;s <span className="text-accent">connect.</span>
          </motion.h2>

          {/* primary contact links */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 xl:mb-10 text-sm"
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
              className="flex items-center gap-x-2 hover:text-accent transition-all duration-300 break-all"
            >
              <RiMailLine className="text-xl flex-shrink-0" aria-hidden />
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
              className="flex flex-col gap-4 sm:gap-5 w-full"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              {/* Row 1 — name + email */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
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
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
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

              {/* Services — dropdown box opening a lightbox/modal */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowServicesModal(true)}
                  disabled={isLoading}
                  className={`input flex items-center justify-between text-left cursor-pointer ${
                    serviceError ? "border-red-400" : ""
                  }`}
                >
                  <span
                    className={
                      form.services.length ? "text-white" : "text-white/30 font-light"
                    }
                  >
                    {form.services.length
                      ? `${form.services.length} service${form.services.length > 1 ? "s" : ""} selected`
                      : "Select Services *"}
                  </span>
                  <HiChevronDown className="text-xl text-white/50 flex-shrink-0" aria-hidden />
                </button>

                {/* selected services — shown together below the box */}
                {form.services.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center xl:justify-start">
                    {form.services.map((svc) => (
                      <span
                        key={svc}
                        className="flex items-center gap-x-2 bg-accent/15 border border-accent/40 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full"
                      >
                        {svc}
                        <button
                          type="button"
                          onClick={() => removeService(svc)}
                          disabled={isLoading}
                          aria-label={`Remove ${svc}`}
                          className="hover:text-red-400 transition-colors"
                        >
                          <HiX />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {serviceError && (
                  <p className="text-red-400 text-xs text-left">
                    Please select at least one service.
                  </p>
                )}
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
              <div className="flex items-center justify-center xl:justify-start mt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative z-10 btn rounded-full border border-white/50 px-8 w-full sm:w-auto transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group min-w-[150px] disabled:opacity-60 disabled:cursor-not-allowed"
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

      {/* Services selection lightbox / modal */}
      <AnimatePresence>
        {showServicesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowServicesModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-primary border border-white/10 rounded-2xl w-full max-w-[520px] max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* modal header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 flex-shrink-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Select Services
                </h3>
                <button
                  type="button"
                  onClick={() => setShowServicesModal(false)}
                  aria-label="Close"
                  className="text-white/50 hover:text-accent transition-colors text-2xl"
                >
                  <HiX />
                </button>
              </div>

              {/* modal body — scrollable list */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 flex flex-col gap-2">
                {SERVICES.map((svc) => {
                  const active = form.services.includes(svc);
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => toggleService(svc)}
                      className={`flex items-center gap-x-3 w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                        active
                          ? "bg-accent/15 border-accent text-white"
                          : "border-white/15 text-white/60 hover:border-white/30 hover:text-white/80"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          active
                            ? "bg-accent border-accent"
                            : "border-white/30"
                        }`}
                      >
                        {active && <span className="text-white text-xs">✓</span>}
                      </span>
                      <span className="text-sm sm:text-base">{svc}</span>
                    </button>
                  );
                })}
              </div>

              {/* modal footer */}
              <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t border-white/10 flex-shrink-0">
                <span className="text-xs sm:text-sm text-white/40">
                  {form.services.length} selected
                </span>
                <button
                  type="button"
                  onClick={() => setShowServicesModal(false)}
                  className="btn rounded-full bg-accent text-white px-8 hover:bg-accent/80 transition-all duration-300"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;

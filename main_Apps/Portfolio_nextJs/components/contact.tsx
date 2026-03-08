"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import ContactForm from "./contact-form";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center scroll-mt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact Me</SectionHeading>

      <p className="text-gray-400 -mt-6 mb-12">
        Reach out to me directly at{" "}
        <a
          className="underline text-purple-400 hover:text-purple-300 transition-colors font-medium"
          href="mailto:aouladamarsamir@gmail.com"
        >
          aouladamarsamir@gmail.com
        </a>{" "}
        or use the form below to send a message.
      </p>

      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm text-left">
        <ContactForm />
      </div>
    </motion.section>
  );
}


"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center scroll-mt-24"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact Me</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Reach out to me directly at{" "}
        <a
          className="underline text-indigo-600 hover:text-indigo-800"
          href="mailto:aouladamarsamir@gmail.com"
        >
          aouladamarsamir@gmail.com
        </a>{" "}
        or use the form below to send a message.
      </p>

      <form
        className="mt-10 flex flex-col gap-6 dark:text-black"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
      >
        {/* Email Input */}
        <input
          className="h-14 px-6 rounded-lg border-2 border-gray-300 dark:bg-white dark:bg-opacity-80 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />

        {/* Message Textarea */}
        <textarea
          className="h-52 my-3 rounded-lg border-2 border-gray-300 dark:bg-white dark:bg-opacity-80 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none p-4 transition-all duration-300 ease-in-out transform hover:scale-105"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />

        {/* Submit Button */}
        <SubmitBtn />
      </form>
    </motion.section>
  );
}

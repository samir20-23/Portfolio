"use client";

import React from "react";
import { motion } from "framer-motion";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function ContactForm() {
    return (
        <form
            className="flex flex-col gap-6"
            action={async (formData) => {
                const { data, error } = await sendEmail(formData);

                if (error) {
                    toast.error(error);
                    return;
                }

                toast.success("Email sent successfully!");
            }}
        >
            <input
                className="h-14 px-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                name="senderEmail"
                type="email"
                required
                maxLength={500}
                placeholder="Your email address"
            />
            <textarea
                className="h-52 rounded-2xl bg-white/5 border border-white/10 p-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all resize-none"
                name="message"
                placeholder="How can I help you?"
                required
                maxLength={5000}
            />
            <div className="flex justify-center sm:justify-start">
                <SubmitBtn />
            </div>
        </form>
    );
}

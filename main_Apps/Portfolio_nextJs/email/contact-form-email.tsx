import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
};

export default function ContactFormEmail({
  message,
  senderEmail,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>📩 New message from your portfolio site</Preview>
      <Tailwind>
        <Body className="bg-gray-50 text-gray-900">
          <Container>
            {/* Logo Section */}
            {/* Logo Section with fade-in animation */}
            <Section className="flex justify-center py-4 animate-fade-in">
              <Img
                src="https://www.shutterstock.com/image-vector/word-portfolio-on-abstract-colorful-260nw-1917315023.jpg"
                width="100"
                height="50"
                alt="portfolio logo"
                className="mx-auto"
              />
            </Section>


            {/* Email Content */}
            <Section className="bg-white border border-gray-300 shadow-lg my-10 px-10 py-6 rounded-lg animate-fade-in">
              <Heading className="text-xl font-bold text-center text-indigo-600">
                ✉️ New Message from Your 'next js' Portfolio Site
              </Heading>
              <Text className="text-gray-700 text-lg mt-2">
                <span className="font-semibold">📌 Message:</span> {message}
              </Text>
              <Hr className="border-gray-300 my-4" />
              <Text className="text-gray-600">
                <span className="font-semibold">📧 Sender's Email:</span> {senderEmail}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="text-center text-gray-500 text-sm">
              <Text>
                🔗 <a href="https://samiraouladamar-portfolio.vercel.app" className="text-blue-600 hover:underline">
                  Visit My Portfolio
                </a>
              </Text>
              <Text>© {new Date().getFullYear()} Your Name. All Rights Reserved.</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

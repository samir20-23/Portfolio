// app/layout.tsx
import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ChatAi from "@/components/chatAi";
import SocialDock from "@/components/social-dock";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata = {
  title: "Aoulad Amar | Personal Portfolio",
  description: "Aoulad Amar Samir full-stack developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        {/* Load GSAP via next/script for predictable timing */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          strategy="afterInteractive"
        />

        {/* Font Awesome (single version). self-closing in JSX */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {/* favicon / avatar (self-closing) */}
        <link
          rel="icon"
          type="image/png"
          href="https://avatars.githubusercontent.com/u/144660881?v=4"
        />

        {/* your local script (runs after hydration) */}
        <Script src="/script.js" strategy="afterInteractive" />
      </head>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative  dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 min-h-screen overflow-x-hidden`}
        id="boxModel"
      >
        <div
          data-us-project="rwy7vJzThGirV65jNrXC"
          id="model"
          className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-10"
        ></div>
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            <div className="cursor" />
            {children}
            <Footer />
            <SocialDock />
            <Toaster position="top-right" />
            <div
              className="fixed  right-3 bg-white w-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center transition-all dark:bg-gray-950 dark:border-gray-800 z-50"
              style={{ bottom: "36px" }}  >
              <ChatAi />
              <ThemeSwitch />
            </div>
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html >
  );
}

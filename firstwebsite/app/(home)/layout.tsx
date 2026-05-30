import { Metadata } from "next";
import {Poppins} from "next/font/google"
import "../globals.css";
import HomeHeader from "@/components/header/HomeHeader";


const PoppinsSans = Poppins({
  weight: ["100", "200", '300', '400', '500','600', '700','800','900'],
  variable: "--font-custom-sans",
  subsets: ["latin"]
})

const PoppinsMono = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-custom-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecom-Homepage",
  description:
    "Welcome to Ecom-home, this is the platform where you can purchase anything online.",
  openGraph: {
    title: "Ecom-Homepage",
    description:
      "Welcome to Ecom-home, this is the platform where you can purchase anything online.",
    // images: "",
    type: "article",
  },
  twitter: {
    title: "Ecom-Homepage",
    description:
      "Welcome to Ecom-home, this is the platform where you can purchase anything online.",
    card: "summary",
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${PoppinsSans.variable} ${PoppinsMono.variable} min-h-full flex flex-col antialiased`}
      >
        <HomeHeader />

        {children}

        <footer></footer>
      </body>
    </html>
  );
}
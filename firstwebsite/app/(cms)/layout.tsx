import { ReactNode } from "react";
import { Roboto, Roboto_Mono } from "next/font/google";
import "../globals.css"

const RobotoSans = Roboto({
  variable: "--font-custom-sans",
  subsets: ['latin']
})

const RobotoMono = Roboto_Mono({
  variable: "--font-custom-mono",
  subsets: ['latin']
})
export default function CMSLayout({children}: Readonly<{children: ReactNode}>) {
  return(<html className={`${RobotoSans.variable} ${RobotoMono.variable} antialiased`}>
    <body>
      <header>Dashboard Header</header>
      {children}
    </body>
  </html>)
}
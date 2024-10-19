import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import ProviderLang from "./ProviderLang";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Formula One",
  description: "Formula one driving school",
};

export default function RootLayout({ children }) {
  return (
    <ProviderLang  >
      <html lang="en" suppressHydrationWarning={true}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
          {children}
          <Footer/>
        </body>
      </html>
    </ProviderLang>
  );
}

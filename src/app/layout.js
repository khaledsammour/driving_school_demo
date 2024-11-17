import localFont from "next/font/local";
import "./globals.css";
import ProviderLang from "./ProviderLang";
import { Toaster } from "react-hot-toast";
import LayoutProvider from "./components/LayoutProvider";
import ScrollToTopButton from "./components/ScrollToTopButton";
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
         <LayoutProvider>
          <ScrollToTopButton/>
         <Toaster position="top-center" reverseOrder={false} />
          {children}
         </LayoutProvider>
        </body>
      </html>
    </ProviderLang>
  );
}

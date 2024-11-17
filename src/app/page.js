import Image from "next/image";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Pricing from "./components/Priceing";
import Testimonials from "./components/Testimonials";
import DownloadApp from "./components/DownloadApp";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <>
   <div className="home">

    <Hero/>
    <Services/>
    <WhyChooseUs/>
    <Pricing/>
    <DownloadApp/>
    <Testimonials/>
   </div>
    </>
  );
}

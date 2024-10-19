import Image from "next/image";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Pricing from "./components/Priceing";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
   <div className="home">

    <Hero/>
    <Services/>
    <Pricing/>
    <Testimonials/>
   </div>
    </>
  );
}



import React from "react";
import Lottie from "lottie-react";
import HeroAnimate from "@/app/assets/hero.json";

export default function LottieHandler() {
  return (
    <div className="flex justify-center items-center mt-5">
      <Lottie
        animationData={HeroAnimate}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
}

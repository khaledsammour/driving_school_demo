

import React from "react";
import Lottie from "lottie-react";


export default function LottieHandler({ animate }) {
  return (
    <div className="flex justify-center items-center mt-5">
      <Lottie
        animationData={animate}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
}

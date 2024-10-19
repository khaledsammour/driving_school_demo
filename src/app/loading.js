"use client";
import Lottie from "lottie-react";
import animationData from "@/app/assets/loaderAnimate.json";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-50 backdrop-blur-md">
      <div className=" bg-opacity-20 rounded-lg p-6">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: 400, height: 400 }}
        />
      </div>
    </div>
  );
}

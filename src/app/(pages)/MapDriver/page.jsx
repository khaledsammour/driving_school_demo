"use client";
import dynamic from "next/dynamic";
import LottieHandler from '@/app/components/LottieHandler';
import MapDriver from "@/app/assets/mapDriver.json";
import Link from "next/link";

const MapComponent = dynamic(() => import("@/app/components/DriverMap"), {
    ssr: false,
});

export default function Page() {
    return (
        <div className="flex flex-col lg:flex-row w-full h-[90vh]">
            <div className="w-full lg:w-[30%] px-4 py-5 lg:py-0">
                <div className="my-5">
                    <LottieHandler animate={MapDriver} />
                </div>
                <div className="rounded-md shadow my-5">
                    <Link
                        href={"/Pricing"}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white border-1 border-blue-600 bg-blue-600 hover:bg-white hover:border-1 hover:border-blue-600 hover:text-blue-600 md:py-4 md:text-lg md:px-10"
                    >
                        Continue
                    </Link>
                </div>
            </div>

            <div className="w-full lg:w-[70%] px-4">
                <MapComponent />
            </div>
        </div>
    );
}

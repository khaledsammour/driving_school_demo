"use client"
import React from 'react'

export default function Error({ error , reset }) {
  return (
    <>
    <div className="">
        <p className="text-red-500 text-center mt-7">{error.message}</p>
        <div className="flex justify-center items-center py-40">
        <div
            className="bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]"
        >
            <button
            className="group p-[4px] rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]"
            onClick={() => reset()}
            >
            <div
                className="bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[8px] px-2 py-2"
            >
                <div class="flex gap-2 items-center">
                <span className="font-semibold">Try again</span>
                </div>
            </div>
            </button>
        </div>
        </div>


    </div>
    </>
  )
}

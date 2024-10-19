"use client"

import Link from "next/link"

export default function page() {
  return (
  <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex flex-row items-center justify-between">
        <div className="text-9xl font-bold text-blue-900">4</div>

        <div className="relative w-48 mx-5">
          <div className="absolute bottom-0 left-0 w-48 h-44 rounded-full bg-blue-900"></div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 overflow-hidden w-48 h-52 rounded-b-full">
            <div className="absolute bottom-[-0.3rem] left-1/2 transform -translate-x-1/2 w-36 h-48 border-2 border-blue-900 bg-white rounded-lg">
              <div className="relative mt-8">
                <div className="absolute top-0 left-10 w-20 h-4">
                  <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-blue-900 animate-eye" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-blue-900 animate-eye" />
                </div>
                <div className="absolute top-4 left-3 w-2 h-0.5 rounded bg-pink-400" />
                <div className="absolute top-4 right-3 w-2 h-0.5 rounded bg-pink-400" />
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-10 h-0.5 rounded bg-blue-900" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-9xl font-bold text-blue-900">4</div>
      </div>

      <div className="mt-20 text-lg font-bold text-blue-900">
        Oops. The page you're looking for doesn't exist.
      </div>

      <Link
        href="/"
        className="mt-8 px-6 py-3 text-white bg-blue-500 rounded transition duration-300 hover:bg-blue-700"
      >
        Back Home
      </Link>
      <style jsx>{`
        @keyframes eye {
          0% {
            height: 0.2rem;
          }
          50% {
            height: 0.2rem;
          }
          52% {
            height: 0.1rem;
          }
          54% {
            height: 0.2rem;
          }
          100% {
            height: 0.2rem;
          }
        }

        .animate-eye {
          animation-name: eye;
          animation-duration: 4s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  )
}

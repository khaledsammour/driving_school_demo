"use client";
import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { usePathname } from "next/navigation";

export default function LayoutProvider({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isDriverRoute = pathname.startsWith('/driver');
  const isUserRoute = pathname.startsWith('/user');



  return (
    <>
      {!isAdminRoute && !isUserRoute && !isDriverRoute && <Navbar />}
      {children}
      {!isAdminRoute && !isUserRoute && !isDriverRoute && <Footer />}
    </>
  )
}

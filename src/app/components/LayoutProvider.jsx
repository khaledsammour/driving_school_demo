"use client";
import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { usePathname } from "next/navigation";

export default function LayoutProvider({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  )
}

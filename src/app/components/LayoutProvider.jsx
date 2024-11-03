"use client";
import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { usePathname } from "next/navigation";

export default function LayoutProvider({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isUserRoute = pathname.startsWith('/user');

 

  return (
    <>
      {!isAdminRoute && !isUserRoute && <Navbar />}
      {children}
      {!isAdminRoute && !isUserRoute && <Footer />}
    </>
  )
}

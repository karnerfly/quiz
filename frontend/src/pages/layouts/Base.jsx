import React from "react";
import { Outlet } from "react-router";
import Navbar from "@src/components/ui/Header";
import Footer from "@src/components/ui/Footer";

function Base() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Base;
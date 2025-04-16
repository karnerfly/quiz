import React from "react";
import { Outlet } from "react-router";
import Navbar from "@src/components/common/Header";
import Footer from "@src/components/common/Footer";

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
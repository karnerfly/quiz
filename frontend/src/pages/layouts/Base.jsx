import React from "react";
import { Outlet } from "react-router";
import Navbar from "@src/components/common/Header";
import Footer from "@src/components/common/Footer";
import GoToTopButton from "@src/components/ui/GoToTopButton";

function Base() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <GoToTopButton />
      <Footer />
    </>
  );
}

export default Base;
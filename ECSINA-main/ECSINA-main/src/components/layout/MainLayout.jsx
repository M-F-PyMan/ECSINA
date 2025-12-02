import React from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";

function MainLayout({ children }) {
  return (
    <body className="flex flex-col min-h-screen">
      <Navbar />
      <main className="my-10 ">{children}</main>
      <Footer />
    </body>
  );
}

export default MainLayout;


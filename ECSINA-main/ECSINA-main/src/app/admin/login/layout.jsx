import React from "react";

export default function LoginLayout({ children }) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white">
      <div className="pt-7 pr-7">
        <h1 className="font-extrabold text-2xl text-black">اکسینا</h1>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}

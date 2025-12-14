import UserLayoutComponent from "@/components/user/UserLayout";
import React from "react";

export default function UserLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-iransans" style={{ background: "var(--color-secondary-2)" }}>
        <UserLayoutComponent>{children}</UserLayoutComponent>
      </body>
    </html>
  );
}
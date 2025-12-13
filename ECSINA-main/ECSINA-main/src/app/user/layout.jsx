import UserLayoutComponent from "@/components/user/UserLayout";
import React from "react";

function UserLayout({ children }) {
  return (
    <body lang="fa" dir="rtl" style={{background:'var(--color-secondary-2)'}}>
      <UserLayoutComponent>{children}</UserLayoutComponent>
    </body>
  );
}

export default UserLayout;

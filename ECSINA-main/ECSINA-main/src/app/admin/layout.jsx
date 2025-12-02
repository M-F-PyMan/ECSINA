import { redirect } from "next/navigation";

function AdminLayout({ children }) {
  // TODO: Check token and if not redirect to login
  const token = true;
  if (!token) redirect("/admin/login", "replace");

  return <body>{children}</body>;
}

export default AdminLayout;

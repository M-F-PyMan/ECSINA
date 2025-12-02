import { redirect } from "next/navigation";

const AdminPage = () => {
  return redirect("/admin/proposal", "push");
};

export default AdminPage;

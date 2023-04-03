import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="flex">
        <AdminSidebar />
        <div className="w-full h-screen overflow-y-scroll p-8">{children}</div>
      </div>
    </>
  );
}

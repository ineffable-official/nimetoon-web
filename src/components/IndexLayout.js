import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function IndexLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-scroll p-8 pb-32">{children}</div>
      </div>
    </>
  );
}

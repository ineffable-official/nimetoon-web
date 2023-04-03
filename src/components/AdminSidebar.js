import Link from "next/link";
import { useState } from "react";

export default function AdminSidebar() {
  const [dataMaster, setDataMaster] = useState(true);
  return (
    <div className="w-[250px] h-screen border-r-[1px] flex flex-col p-2">
      <Link href={"/"} className="w-full h-11 flex">
        <div className="w-11 h-11 flex items-center justify-center"></div>
        <div className="h-11 ml-2 flex items-center text-sm">NIMETOON</div>
      </Link>
      <hr className="my-2" />
      <Link
        href={"/admin"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-dashboard"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Dashboard</div>
      </Link>
      <Link
        href={"/admin/animes"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-waveform"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Animes</div>
      </Link>
      <Link
        href={"/admin/videos"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-video"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Videos</div>
      </Link>
      <Link
        href={"/admin/data-master"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-box"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Data Master</div>
      </Link>
    </div>
  );
}

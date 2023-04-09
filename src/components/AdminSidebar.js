import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function AdminSidebar() {
  const [dataMaster, setDataMaster] = useState(true);
  const [userData, setUserData] = useState();
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const checkAuthorization = useCallback(
    (userData) => {
      axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/account", {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then((res) => {
          if (res.data.status) {
            if (res.data.data.role === "admin") {
              setAuthorized(true);
              setUserData(userData);
            } else {
              router.push("/login");
            }
          } else {
            router.push("/login");
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    [router]
  );
  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (userData) {
      checkAuthorization(JSON.parse(userData));
    } else {
      router.push("/login");
    }
  }, [checkAuthorization, router]);

  return (
    <div className="w-[250px] h-screen flex flex-col p-2 dark:bg-[#17181A] dark:text-gray-300">
      <Link href={"/"} className="w-full h-11 flex">
        <div className="w-11 h-11 flex items-center justify-center"></div>
        <div className="h-11 ml-2 flex items-center text-sm">NIMETOON</div>
      </Link>
      <hr className="my-2 dark:border-[rgba(255,255,255,0.2)]" />
      <Link
        href={"/admin"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:text-gray-300 dark:hover:bg-[rgba(255,255,255,0.1)]"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-dashboard"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Dashboard</div>
      </Link>
      <Link
        href={"/admin/animes"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:text-gray-300 dark:hover:bg-[rgba(255,255,255,0.1)]"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-waveform"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Animes</div>
      </Link>
      <Link
        href={"/admin/videos"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:text-gray-300 dark:hover:bg-[rgba(255,255,255,0.1)]"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-video"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Videos</div>
      </Link>
      <Link
        href={"/admin/data-master"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:text-gray-300 dark:hover:bg-[rgba(255,255,255,0.1)]"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-box"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Data Master</div>
      </Link>
      <Link
        href={"/admin/files"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:text-gray-300 dark:hover:bg-[rgba(255,255,255,0.1)]"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-files"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Files</div>
      </Link>
    </div>
  );
}

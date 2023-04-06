import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Layout() {
  

  const [userData, setUserData] = useState();
  const [userMenus, setUserMenus] = useState(false);

  const closeUserMenus = (e) => {
    if (e.target.id === "user-menus") {
      setUserMenus(false);
    }
  };

  const handleLogout = (e) => {
    axios
      .post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem("user-data");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  return (
    <div className="w-full h-auto flex flex-wrap px-8 py-2 border-b-[1px]">
      <Link href={"/"} className="w-auto h-11 flex items-center justify-center">
        NIMETOON
      </Link>
      <form action="/search" className="mx-auto">
        <div className="flex relative">
          <input
            className="w-[400px] h-11 px-6 border-[1px] rounded-full focus:border-gray-400 outline-none"
            type="search"
            name="s"
            id="search"
            placeholder="Search ..."
          />
          <button className="w-11 h-11 absolute right-0 text-gray-400 flex items-center justify-center">
            <i className="fa-light fa-search"></i>
          </button>
        </div>
      </form>
      <div className="flex gap-1">
        <div className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100">
          <i className="fa-light fa-moon"></i>
        </div>
        <div className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100">
          <i className="fa-light fa-bell"></i>
        </div>
        {userData ? (
          <div
            className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100"
            onClick={() => setUserMenus(true)}
          >
            <i className="fa-light fa-circle-user"></i>
          </div>
        ) : (
          <Link
            href={"/login"}
            className="px-6 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100 border-[1px] text-sm"
          >
            LOGIN
          </Link>
        )}
      </div>
      {userMenus ? (
        <div
          className="w-screen h-screen fixed top-0 left-0 z-50"
          id="user-menus"
          onClick={closeUserMenus}
        >
          <div className="w-[300px] h-fit p-2 bg-white border-[1px] rounded-xl right-2 top-[64px] absolute">
            <div className="w-full p-2 rounded-lg border-[1px] flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <i className="fa-light fa-circle-user"></i>
              </div>
              <span className="ml-2 text-sm">{userData.user.name}</span>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col">
              <div className="w-full rounded-lg flex hover:bg-gray-100 items-center text-gray-500 hover:text-black">
                <div className="w-11 h-11 cursor-pointer flex items-center justify-center">
                  <i className="fa-light fa-user"></i>
                </div>
                <span className="ml-2 text-sm">Profiles</span>
              </div>
              <div className="w-full rounded-lg flex hover:bg-gray-100 items-center text-gray-500 hover:text-black">
                <div className="w-11 h-11 cursor-pointer flex items-center justify-center">
                  <i className="fa-light fa-cog"></i>
                </div>
                <span className="ml-2 text-sm">Settings</span>
              </div>
              <div
                className="w-full rounded-lg flex hover:bg-gray-100 items-center text-gray-500 hover:text-black cursor-pointer"
                onClick={() => handleLogout()}
              >
                <div className="w-11 h-11 cursor-pointer flex items-center justify-center">
                  <i className="fa-light fa-right-from-bracket"></i>
                </div>
                <span className="ml-2 text-sm">Logout</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

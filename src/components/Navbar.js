import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });

export default function Layout() {
  const [userData, setUserData] = useState();
  const [userMenus, setUserMenus] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();

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

  const handleSearch = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    router.push({ pathname: "/search", query: { s: form.getAll("s")[0] } });
  };

  const checkAuthorization = useCallback(
    (userData) => {
      axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/account", {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then((res) => {
          if (res.data.status) {
            setAuthorized(true);
            setUserData(userData);
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

  const toggleDarkMode = () => {
    if (isDarkMode) {
      const html = document
        .getElementsByTagName("html")[0]
        .classList.remove("dark");
      setIsDarkMode(false);
    } else {
      const html = document
        .getElementsByTagName("html")[0]
        .classList.add("dark");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (userData) checkAuthorization(JSON.parse(userData));
  }, [checkAuthorization]);

  return (
    <div className="w-full h-auto flex flex-wrap px-8 py-2 border-b-[1px] dark:border-b-[rgba(255,255,255,0.2)] dark:bg-[#17181A] dark:text-white">
      <Link
        href={"/"}
        className="w-auto h-11 flex items-center justify-center"
        style={poppins.style}
      >
        NIMETOON
      </Link>
      <form className="mx-auto" onSubmit={handleSearch}>
        <div className="flex relative">
          <input
            className="w-[400px] h-11 px-6 border-[1px] rounded-full focus:border-gray-400 dark:bg-[rgba(255,255,255,0.075)] dark:border-[rgba(255,255,255,0.075)] outline-none"
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
        <div
          className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] dark:text-gray-400"
          onClick={toggleDarkMode}
        >
          <i className="fa-light fa-moon"></i>
        </div>
        <div className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] dark:text-gray-400">
          <i className="fa-light fa-bell"></i>
        </div>
        {userData ? (
          <div
            className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100 dark:bg-[rgba(255,255,255,0.1)]"
            onClick={() => setUserMenus(true)}
          >
            <picture>
              <img
                src={
                  userData.user.images
                    ? userData.user.images
                    : "https://onwaleed.sirv.com/R.png"
                }
                className="w-6"
                alt=""
              />
            </picture>
          </div>
        ) : (
          <Link
            href={"/login"}
            className="px-6 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100 border-[1px] text-sm dark:border-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
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
          <div className="w-[300px] h-fit p-2 bg-white border-[1px] dark:bg-[#17181A] dark:text-gray-400 dark:border-[rgba(255,255,255,0.1)] rounded-xl right-2 top-[64px] absolute">
            <div className="w-full p-2 rounded-lg bg-gray-50 flex items-center dark:bg-[rgba(255,255,255,0.1)] ">
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <picture>
                  <img
                    src={
                      userData.user.images
                        ? userData.user.images
                        : "https://onwaleed.sirv.com/R.png"
                    }
                    className="w-6"
                    alt=""
                  />
                </picture>
              </div>
              <span className="ml-2 text-sm">{userData.user.name}</span>
            </div>
            <hr className="my-2 dark:border-[rgba(255,255,255,0.2)] " />
            <div className="flex flex-col">
              <div className="w-full rounded-lg flex hover:bg-gray-100 items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:bg-[rgba(255,255,255,0.1)] ">
                <div className="w-11 h-11 cursor-pointer flex items-center justify-center">
                  <i className="fa-light fa-user"></i>
                </div>
                <span className="ml-2 text-sm">Profiles</span>
              </div> 
              <div className="w-full rounded-lg flex hover:bg-gray-100 items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:bg-[rgba(255,255,255,0.1)]">
                <div className="w-11 h-11 cursor-pointer flex items-center justify-center">
                  <i className="fa-light fa-cog"></i>
                </div>
                <span className="ml-2 text-sm">Settings</span>
              </div>
              <div
                className="w-full rounded-lg flex hover:bg-gray-100 items-center text-gray-500 dark:text-gray-400 hover:text-black cursor-pointer dark:hover:bg-[rgba(255,255,255,0.1)]"
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

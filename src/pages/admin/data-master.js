import AdminLayout from "@/components/AdminLayout";
import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";
import cookies from "next-cookies";

export default function DataMaster() {
  
  const [types, setTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [studios, setStudios] = useState([]);
  const [genres, setGenres] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [userData, setUserData] = useState();

  const getTypes = (token) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/types", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setTypes(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const typeSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/types", form, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const typeDestroy = (e, typeId) => {
    e.preventDefault();
    axios
      .delete(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/types",
        { data: { id: typeId } },
        {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };
  const getStatuses = (token) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/statuses", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setStatuses(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const statusSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/statuses", form, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const statusDestroy = (e, ID) => {
    e.preventDefault();
    axios
      .delete(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/statuses",
        { data: { id: ID } },
        {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };
  const getStudios = (token) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/studios", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setStudios(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const studioSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/studios", form, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const studioDestroy = (e, ID) => {
    e.preventDefault();
    axios
      .delete(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/studios",
        { data: { id: ID } },
        {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };
  const getGenres = (token) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/genres", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setGenres(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const genreSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/genres", form, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const genreDestroy = (e, ID) => {
    e.preventDefault();
    axios
      .delete(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/genres",
        { data: { id: ID } },
        {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };
  const getSeasons = (token) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/seasons", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setSeasons(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const seasonSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/seasons", form, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const seasonDestroy = (e, ID) => {
    e.preventDefault();
    axios
      .delete(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/seasons",
        { data: { id: ID } },
        {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  useEffect(() => {
    const getAllData = (userData) => {
      getGenres(userData.token);
      getSeasons(userData.token);
      getStatuses(userData.token);
      getStudios(userData.token);
      getTypes(userData.token);
    };

    if (userData && userData.token) {
      getAllData(userData);
    }
  }, [userData]);

  return (
    <div className="w-screen h-screen dark:bg-[#17181A] dark:text-gray-300">
      <AdminLayout>
        <h1 className="font-semibold text-xl">Data Master</h1>
        <div className="w-full mt-4">
          <div className="w-full h-auto p-4 border-[1px] rounded-xl bg-gray-50 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
            <div className="text-sm font-medium">Types</div>
            <div className="flex flex-wrap mt-3 gap-2">
              {types
                ? types.map((t) => (
                    <form key={t.id} onSubmit={(e) => typeDestroy(e, t.id)}>
                      <div className="pl-2 pr-1 py-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                        <div className="text-xs">{t.name}</div>
                        <button
                          type="submit"
                          className="text-[8px] ml-2 w-4 h-4 hover:bg-gray-300 rounded-md flex items-center justify-center dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                        >
                          <i className="fa-light fa-x"></i>
                        </button>
                      </div>
                    </form>
                  ))
                : ""}
              <form className="m-0 p-0" onSubmit={typeSubmit}>
                <div className="p-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                  <input
                    type="text"
                    name="name"
                    className="w-24 text-xs px-2 bg-transparent focus:bg-gray-100 rounded-md outline-none dark:focus:bg-[rgba(255,255,255,0.2)]"
                    placeholder="Name"
                  />
                  <button
                    type="submit"
                    className="w-4 h-4 rounded-md bg-gray-300 ml-1 text-gray-700 text-[8px] dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300 "
                  >
                    <i className="fa-light fa-send"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full h-auto p-4 border-[1px] rounded-xl bg-gray-50 mt-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
            <div className="text-sm font-medium">Status</div>
            <div className="flex flex-wrap mt-3 gap-2">
              {statuses
                ? statuses.map((t) => (
                    <form key={t.id} onSubmit={(e) => statusDestroy(e, t.id)}>
                      <div className="pl-2 pr-1 py-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                        <div className="text-xs">{t.name}</div>
                        <button
                          type="submit"
                          className="text-[8px] ml-2 w-4 h-4 hover:bg-gray-300 rounded-md flex items-center justify-center dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                        >
                          <i className="fa-light fa-x"></i>
                        </button>
                      </div>
                    </form>
                  ))
                : ""}
              <form className="m-0 p-0" onSubmit={statusSubmit}>
                <div className="p-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                  <input
                    type="text"
                    name="name"
                    className="w-24 text-xs px-2 bg-transparent focus:bg-gray-100 rounded-md outline-none dark:focus:bg-[rgba(255,255,255,0.2)]"
                    placeholder="Name"
                  />
                  <button
                    type="submit"
                    className="w-4 h-4 rounded-md bg-gray-300 ml-1 text-gray-700 text-[8px] dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                  >
                    <i className="fa-light fa-send"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full h-auto p-4 border-[1px] rounded-xl bg-gray-50 mt-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
            <div className="text-sm font-medium">Studios</div>
            <div className="flex flex-wrap mt-3 gap-2">
              {studios
                ? studios.map((t) => (
                    <form key={t.id} onSubmit={(e) => studioDestroy(e, t.id)}>
                      <div className="pl-2 pr-1 py-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                        <div className="text-xs">{t.name}</div>
                        <button
                          type="submit"
                          className="text-[8px] ml-2 w-4 h-4 hover:bg-gray-300 rounded-md flex items-center justify-center dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                        >
                          <i className="fa-light fa-x"></i>
                        </button>
                      </div>
                    </form>
                  ))
                : ""}
              <form className="m-0 p-0" onSubmit={studioSubmit}>
                <div className="p-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                  <input
                    type="text"
                    name="name"
                    className="w-24 text-xs px-2 bg-transparent focus:bg-gray-100 rounded-md outline-none dark:focus:bg-[rgba(255,255,255,0.2)]"
                    placeholder="Name"
                  />
                  <button
                    type="submit"
                    className="w-4 h-4 rounded-md bg-gray-300 ml-1 text-gray-700 text-[8px] dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                  >
                    <i className="fa-light fa-send"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full h-auto p-4 border-[1px] rounded-xl bg-gray-50 mt-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
            <div className="text-sm font-medium">Seasons</div>
            <div className="flex flex-wrap mt-3 gap-2">
              {seasons
                ? seasons.map((t) => (
                    <form key={t.id} onSubmit={(e) => seasonDestroy(e, t.id)}>
                      <div className="pl-2 pr-1 py-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                        <div className="text-xs">{t.name}</div>
                        <button
                          type="submit"
                          className="text-[8px] ml-2 w-4 h-4 hover:bg-gray-300 rounded-md flex items-center justify-center dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                        >
                          <i className="fa-light fa-x"></i>
                        </button>
                      </div>
                    </form>
                  ))
                : ""}
              <form className="m-0 p-0" onSubmit={seasonSubmit}>
                <div className="p-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                  <input
                    type="text"
                    name="name"
                    className="w-24 text-xs px-2 bg-transparent focus:bg-gray-100 rounded-md outline-none dark:focus:bg-[rgba(255,255,255,0.2)]"
                    placeholder="Name"
                  />
                  <button
                    type="submit"
                    className="w-4 h-4 rounded-md bg-gray-300 ml-1 text-gray-700 text-[8px] dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                  >
                    <i className="fa-light fa-send"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full h-auto p-4 border-[1px] rounded-xl bg-gray-50 mt-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
            <div className="text-sm font-medium">Genres</div>
            <div className="flex flex-wrap mt-3 gap-2">
              {genres
                ? genres.map((t) => (
                    <form key={t.id} onSubmit={(e) => genreDestroy(e, t.id)}>
                      <div className="pl-2 pr-1 py-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                        <div className="text-xs">{t.name}</div>
                        <button
                          type="submit"
                          className="text-[8px] ml-2 w-4 h-4 hover:bg-gray-300 rounded-md flex items-center justify-center dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                        >
                          <i className="fa-light fa-x"></i>
                        </button>
                      </div>
                    </form>
                  ))
                : ""}
              <form className="m-0 p-0" onSubmit={genreSubmit}>
                <div className="p-1 flex bg-gray-200 rounded-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]">
                  <input
                    type="text"
                    name="name"
                    className="w-24 text-xs px-2 bg-transparent focus:bg-gray-100 rounded-md outline-none dark:focus:bg-[rgba(255,255,255,0.2)]"
                    placeholder="Name"
                  />
                  <button
                    type="submit"
                    className="w-4 h-4 rounded-md bg-gray-300 ml-1 text-gray-700 text-[8px] dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                  >
                    <i className="fa-light fa-send"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

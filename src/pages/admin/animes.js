import AdminLayout from "@/components/AdminLayout";
import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";

export default function AnimesAdmin() {
  

  const [userData, setUserData] = useState([]);

  const [post, setPost] = useState([]);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);
  const [studio, setStudio] = useState([]);
  const [season, setSeason] = useState([]);
  const [genre, setGenre] = useState([]);

  const [typeSelected, setTypeSelected] = useState(undefined);
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [studioSelected, setStudioSelected] = useState(undefined);
  const [seasonSelected, setSeasonSelected] = useState(undefined);

  const [loading, setLoading] = useState(false);

  const [genres, setGenres] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getData = () => {
    setLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/animes")
      .then((res) => {
        setPost(res.data.data);
        setLoading(false);
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

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/animes", form, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => {
        if (res.data.status) {
          window.location.reload(false);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const statusChange = (e) => {
    if (e.target.value !== "") {
      document.getElementById("status-options").style.display = "flex";
    }
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/statuses?search=" + e.target.value, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => setStatus(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const selectStatus = (e) => {
    setStatusSelected(e.id);
    document.getElementById("status-options").style.display = "none";
    document.getElementById("status-input").value = e.name;
    setStatus([]);
  };
  const studioChange = (e) => {
    if (e.target.value !== "") {
      document.getElementById("studio-options").style.display = "flex";
    }
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/studios?search=" + e.target.value, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => setStudio(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const selectStudio = (e) => {
    setStudioSelected(e.id);
    document.getElementById("studio-options").style.display = "none";
    document.getElementById("studio-input").value = e.name;
    setStudio([]);
  };
  const seasonChange = (e) => {
    if (e.target.value !== "") {
      document.getElementById("season-options").style.display = "flex";
    }
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/seasons?search=" + e.target.value, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => setSeason(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const selectSeason = (e) => {
    setSeasonSelected(e.id);
    document.getElementById("season-input").value = e.name;
    document.getElementById("season-options").style.display = "none";
    setSeason([]);
  };

  const typeChange = (e) => {
    if (e.target.value !== "") {
      document.getElementById("type-options").style.display = "flex";
    }

    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/types?search=" + e.target.value, {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((res) => setType(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const selectType = (e) => {
    setTypeSelected(e.id);
    document.getElementById("type-options").style.display = "none";
    document.getElementById("type-input").value = e.name;
    setType([]);
  };

  const selectGenre = (e) => {
    const g = genre;
    if (g.includes(e.id)) {
      const index = g.indexOf(e.id);
      g.splice(index);
      setGenre(g);
      forceUpdate();
      return;
    }
    g.push(e.id);
    setGenre(g);
    forceUpdate();
  };

  const checkGenre = (e) => {
    const gen = genre;
    if (gen.includes(e.id)) return true;
  };

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  useEffect(() => {
    const getAllData = (userData) => {
      getData();
      getGenres(userData.token)
    };

    if (userData && userData.token) {
      getAllData(userData);
    }
  }, [userData]);

  return (
    <div className="w-screen h-screen">
      <AdminLayout>
        <div className="grid grid-cols-3 gap-4">
          <div className="w-full h-auto col-span-2">
            <h1 className="font-semibold text-xl">Animes</h1>
            <div className="flex flex-wrap mt-4 h-screen">
              {!loading ? (
                <div className="grid grid-cols-3 gap-4">
                  {post
                    ? post.map((p) => (
                        <div
                          className="w-full h-fit border-[1px] rounded-xl overflow-hidden hover:border-0 hover:shadow"
                          key={p.id}
                        >
                          <picture>
                            <img
                              src={process.env.NEXT_PUBLIC_BASE_URL + "/storage/" + p.images}
                              alt=""
                            />
                          </picture>
                          <div className="p-3">
                            <div className="text-normal hover:underline">
                              {p.title}
                            </div>
                            <div className="max-h-[250px] truncate text-sm my-1 text-gray-500">
                              {p.descriptions}
                            </div>
                          </div>
                        </div>
                      ))
                    : "Animes not available"}
                </div>
              ) : (
                <div className="w-full h-screen flex items-center justify-center">
                  <div className="w-11 h-11 flex items-center justify-center animate-spin">
                    <i className="fa-light fa-spinner"></i>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-auto">
            <h1 className="font-semibold text-xl">Add Animes</h1>
            <form action="" className="mt-4" onSubmit={onSubmit}>
              <div className="mb-2">
                <input
                  type="text"
                  name="title"
                  id=""
                  className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300"
                  placeholder="Title"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="slug"
                  id=""
                  className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300"
                  placeholder="Slug"
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  name="episodes"
                  id=""
                  className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300"
                  placeholder="Episodes"
                />
              </div>
              <div className="mb-2 relative">
                <input
                  type="text"
                  onChange={typeChange}
                  className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300"
                  placeholder="Type"
                  id="type-input"
                />
                <input type="hidden" name="type" value={typeSelected} />
                <div
                  className="w-full h-auto absolute bg-white p-2 border-[1px] flex-col rounded-lg z-50 hidden"
                  id="type-options"
                >
                  {type
                    ? type.map((t) => (
                        <div
                          className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg"
                          key={t.id}
                          onClick={(e) => selectType(t)}
                        >
                          {t.name}
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div className="mb-2 relative">
                <input
                  type="text"
                  onChange={statusChange}
                  className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300"
                  placeholder="Status"
                  id="status-input"
                />
                <input type="hidden" name="status" value={statusSelected} />
                <div
                  className="w-full h-auto absolute bg-white p-2 border-[1px] hidden flex-col rounded-lg z-50"
                  id="status-options"
                >
                  {status
                    ? status.map((t) => (
                        <div
                          className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg"
                          key={t.id}
                          onClick={(e) => selectStatus(t)}
                        >
                          {t.name}
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div className="mb-2 relative">
                <input
                  type="text"
                  onChange={studioChange}
                  className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300"
                  placeholder="Studio"
                  id="studio-input"
                />
                <input type="hidden" name="studio" value={studioSelected} />
                <div
                  className="w-full h-auto absolute bg-white p-2 border-[1px] hidden flex-col rounded-lg z-50"
                  id="studio-options"
                >
                  {studio
                    ? studio.map((t) => (
                        <div
                          className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg"
                          key={t.id}
                          onClick={(e) => selectStudio(t)}
                        >
                          {t.name}
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div className="mb-2 relative">
                <input
                  type="text"
                  onChange={seasonChange}
                  className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300"
                  placeholder="Season"
                  id="season-input"
                />
                <input type="hidden" name="season" value={seasonSelected} />
                <div
                  className="w-full h-auto absolute bg-white p-2 border-[1px] hidden flex-col rounded-lg z-50"
                  id="season-options"
                >
                  {season
                    ? season.map((t) => (
                        <div
                          className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg"
                          key={t.id}
                          onClick={(e) => selectSeason(t)}
                        >
                          {t.name}
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="" className="text-xs">
                  Aired From
                </label>
                <input
                  type="date"
                  name="aired_from"
                  id=""
                  className="w-full h-11 border-[1px] rounded-lg px-4 text-sm"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="text-xs">
                  Aired To
                </label>
                <input
                  type="date"
                  name="aired_to"
                  id=""
                  className="w-full h-11 border-[1px] rounded-lg px-4 text-sm"
                />
              </div>
              <div className="mb-2">
                <div className="text-xs">Genres</div>
                <div className="flex gap-2 mt-1 overflow-x-scroll">
                  {genres
                    ? genres.map((g) => (
                        <div
                          className="p-2 py-1 text-xs bg-gray-100 rounded-md hover:border-[1px] border-0 cursor-pointer"
                          style={{
                            backgroundColor: checkGenre(g)
                              ? "rgb(209 213 219)"
                              : "",
                          }}
                          key={g.id}
                          onClick={() => selectGenre(g)}
                        >
                          {g.name}
                        </div>
                      ))
                    : ""}
                </div>
                <input
                  type="hidden"
                  name="genres"
                  value={JSON.stringify(genre)}
                />
              </div>
              <div className="mb-2">
                <textarea
                  name="descriptions"
                  id=""
                  cols="30"
                  rows="10"
                  className="w-full h-auto border-[1px] rounded-lg outline-none text-sm p-4"
                  placeholder="Descriptions"
                ></textarea>
              </div>
              <div className="mb-2 overflow-hidden">
                <label htmlFor="images" className="text-xs">
                  Thumbnail
                </label>
                <input
                  className="text-sm"
                  type="file"
                  name="images"
                  id="images"
                />
              </div>
              <div className="mb-2 overflow-hidden">
                <label htmlFor="images" className="text-xs">
                  Image Square
                </label>
                <input
                  className="text-sm"
                  type="file"
                  name="images_square"
                  id="images_square"
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 bg-black text-white rounded-lg text-sm"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

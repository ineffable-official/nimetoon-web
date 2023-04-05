import AdminLayout from "@/components/AdminLayout";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";

export default function VideosAdmin() {
  const baseUrl = "http://localhost:8000";
  const [post, setPost] = useState([]);
  const [anime, setAnime] = useState([]);

  const [userData, setUserData] = useState();

  const [animeSelected, setAnimeSelected] = useState(undefined);

  const [loading, setLoading] = useState(false);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getData = () => {
    setLoading(true);
    axios
      .get(baseUrl + "/api/videos")
      .then((res) => {
        setPost(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(baseUrl + "/api/videos", form, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => {
        if (res.data.status) window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const animeChange = (e) => {
    if (e.target.value !== "") {
      document.getElementById("anime-options").style.display = "flex";
    }

    axios
      .get(baseUrl + "/api/animes?search=" + e.target.value)
      .then((res) => setAnime(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const selectAnime = (e) => {
    setAnimeSelected(e.id);
    document.getElementById("anime-options").style.display = "none";
    document.getElementById("anime-input").value = e.title;
    setAnime([]);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  useEffect(() => {
    const getAllData = (userData) => {
      getData();
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
            <h1 className="font-semibold text-xl">Videos</h1>
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
                              src={baseUrl + "/storage/" + p.images}
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
            <h1 className="font-semibold text-xl">Add Videos</h1>
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

              <div className="mb-2 relative">
                <input
                  type="text"
                  onChange={animeChange}
                  className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300"
                  placeholder="Anime"
                  id="anime-input"
                />
                <input type="hidden" name="anime" value={animeSelected} />
                <div
                  className="w-full h-auto absolute bg-white p-2 border-[1px] flex-col rounded-lg z-50 hidden"
                  id="anime-options"
                >
                  {anime
                    ? anime.map((t) => (
                        <div
                          className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg"
                          key={t.id}
                          onClick={(e) => selectAnime(t)}
                        >
                          {t.title}
                        </div>
                      ))
                    : ""}
                </div>
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
              <div className="mb-2 overflow-hidden flex flex-col">
                <label htmlFor="videos" className="text-xs">
                  Video
                </label>
                <input
                  className="text-sm"
                  type="file"
                  name="videos"
                  id="Videos"
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

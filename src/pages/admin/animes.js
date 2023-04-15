import AdminLayout from "@/components/AdminLayout";
import AnimeForm from "@/components/AnimeForm";
import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";

export default function AnimesAdmin() {
  const [userData, setUserData] = useState([]);
  const [post, setPost] = useState([]);

  const [editing, setEditing] = useState(false);
  const [animeSelected, setAnimeSelected] = useState();

  const [loading, setLoading] = useState(false);

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

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/animes", form, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + userData.token,
        },
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

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    var form_data = {};
    form_data["id"] = animeSelected.id;

    form.forEach((value, key) => {
      if (value === "" || value === "[]" || value.name === "") {
        form.delete(key);
        return;
      }
      form_data[key] = value;
    });

    axios
      .put(process.env.NEXT_PUBLIC_BASE_URL + "/api/animes", form_data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((res) => {
        if (res.data.status) window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const editAnime = (anime) => {
    setEditing(true);
    setAnimeSelected(anime);
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
    <div className="w-screen h-screen dark:bg-[#17181A] dark:text-white">
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
                          className="w-full h-fit border-[1px] rounded-xl overflow-hidden hover:border-0 hover:shadow dark:border-[rgba(255,255,255,0.1)]"
                          key={p.id}
                        >
                          <picture>
                            <img
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "/storage/" +
                                p.images
                              }
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
                            <div className="flex gap-2">
                              <div
                                className="w-7 h-7 flex items-center justify-center text-[10px] bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer"
                                onClick={(e) => editAnime(p)}
                              >
                                <i className="fa-light fa-pencil"></i>
                              </div>
                              <div className="w-7 h-7 flex items-center justify-center text-[10px] bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer">
                                <i className="fa-light fa-x"></i>
                              </div>
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
          {editing ? (
            <AnimeForm submit={handleUpdate} data={animeSelected} />
          ) : (
            <AnimeForm submit={onSubmit} />
          )}
        </div>
      </AdminLayout>
    </div>
  );
}

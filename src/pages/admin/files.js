import AdminLayout from "@/components/AdminLayout";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";

export default function VideosAdmin() {
  const [post, setPost] = useState([]);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getData = useCallback((userData) => {
    setLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/files", {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => {
        setPost(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/files", form, {
        headers: { Authorization: "Bearer " + userData.token },
      })
      .then((res) => {
        if (res.data.status) window.location.reload(false);
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
      getData(userData);
    };

    if (userData && userData.token) {
      getAllData(userData);
    }
  }, [userData, getData]);

  return (
    <div className="w-screen h-screen dark:bg-[#17181A] dark:text-gray-300">
      <AdminLayout>
        <div className="grid grid-cols-3 gap-4">
          <div className="w-full h-auto col-span-2">
            <h1 className="font-semibold text-xl">Files</h1>
            <div className="flex flex-wrap mt-4 h-screen">
              {!loading ? (
                <div className="grid grid-cols-3 gap-4">
                  {post
                    ? post.map((p) => (
                        <div
                          className="w-full h-fit border-[1px] rounded-xl overflow-hidden hover:border-0 hover:shadow dark:border-[rgba(255,255,255,0.1)]"
                          key={p.id}
                        >
                          <div className="w-full h-[250px] flex items-center justify-center text-3xl">
                            <i className="fa-light fa-file"></i>
                          </div>
                          <div className="p-3">
                            <div className="text-normal hover:underline truncate">
                              {p.name}
                            </div>
                            <div className="flex mt-4 gap-2">
                              <div className="w-8 h-8 flex items-center justify-center text-xs bg-[rgba(255,255,255,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.2)]">
                                <i className="fa-light fa-pencil"></i>
                              </div>
                              <div className="w-8 h-8 flex items-center justify-center text-xs bg-[rgba(255,255,255,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.2)]">
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
          <div className="w-full h-auto">
            <h1 className="font-semibold text-xl">Add Videos</h1>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

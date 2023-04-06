import IndexLayout from "@/components/IndexLayout";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function SearchPage() {
  

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getVideos = useCallback(() => {
    setLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/videos?search=" + router.query.s)
      .then((res) => {
        setVideos(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [router]);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <IndexLayout>
        {!loading ? (
          <div className="grid grid-cols-4 gap-4 p-8 pb-32">
            {videos.length > 0
              ? videos.map((p) => <PostCard key={p.id} data={p} />)
              : ""}
          </div>
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-11 h-11 flex items-center justify-center animate-spin">
              <i className="fa-light fa-spinner"></i>
            </div>
          </div>
        )}
      </IndexLayout>
    </div>
  );
}

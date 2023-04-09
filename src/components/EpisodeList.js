import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function EpisodesList(props) {
  
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEpisodes = useCallback(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/videos?anime_id=" + props.anime.id)
      .then((res) => {
        return setEpisodes(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [props]);

  useEffect(() => {
    getEpisodes();
  }, [getEpisodes]);

  return (
    <div className="flex flex-wrap mt-4 h-fit">
      {!loading ? (
        <div className="grid grid-cols-4 gap-4">
          {episodes
            ? episodes.map((p) => (
                <div
                  className="w-full h-fit border-[1px] rounded-xl overflow-hidden hover:border-0 hover:shadow"
                  key={p.id}
                >
                  <picture>
                    <img src={process.env.NEXT_PUBLIC_BASE_URL + "/storage/" + p.images} alt="" />
                  </picture>
                  <div className="p-3">
                    <Link
                      href={"/watch?s=" + p.slug}
                      className="text-normal hover:underline"
                    >
                      {p.title}
                    </Link>
                    <div className="max-h-[150px] truncate text-sm my-1 text-gray-500">
                      {p.descriptions}
                    </div>
                  </div>
                </div>
              ))
            : "Episodes not available"}
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-11 h-11 flex items-center justify-center animate-spin">
            <i className="fa-light fa-spinner"></i>
          </div>
        </div>
      )}
    </div>
  );
}

import EpisodesList from "@/components/EpisodeList";
import IndexLayout from "@/components/IndexLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function AnimePage() {
  const baseUrl = "http://localhost:8000";

  const [loading, setLoading] = useState(false);
  const [anime, setAnime] = useState([]);
  const router = useRouter();
  const getAnime = useCallback(() => {
    axios
      .get(baseUrl + "/api/animes?slug" + router.query.s)
      .then((res) => setAnime(res.data.data))
      .catch((err) => {
        throw err;
      });
  }, [router]);

  useEffect(() => {
    getAnime();
  }, [getAnime]);
  return (
    <div className="w-screen h-screen overflow-hidden">
      <IndexLayout>
        {!loading ? (
          <div className="w-full p">
            {anime
              ? anime.map((a) => (
                  <div className="w-full" key={a.id}>
                    <div className="relative">
                      <div className="w-full h-[300px] overflow-hidden flex justify-center items-center">
                        <picture>
                          <img src={baseUrl + "/storage/" + a.images} alt="" />
                        </picture>
                      </div>
                      <div className="w-full h-[300px] absolute bg-gradient-to-b from-transparent to-white border-b-[1px] top-0 left-0">
                        <div className="w-full h-full relative">
                          <div className="absolute bottom-0 left-0 p-8">
                            <div className="text-2xl font-semibold">
                              One Piece
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {a.genres.map((g) => (
                                <div
                                  className="px-2 py-1 rounded-lg bg-gray-100 text-sm"
                                  key={g.id}
                                >
                                  {g.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="text-2xl font-semibold">Episodes</div>
                      <EpisodesList anime={a} />
                    </div>
                  </div>
                ))
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

import EpisodesList from "@/components/EpisodeList";
import IndexLayout from "@/components/IndexLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function AnimePage() {
  const [loading, setLoading] = useState(false);
  const [anime, setAnime] = useState([]);
  const router = useRouter();
  const getAnime = useCallback(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/animes?slug=" + router.query.s
      )
      .then((res) => setAnime(res.data.data))
      .catch((err) => {
        throw err;
      });
  }, [router]);

  useEffect(() => {
    getAnime();
  }, [getAnime]);
  return (
    <div className="w-screen h-screen overflow-hidden dark:bg-[#17181A] dark:text-gray-300">
      <IndexLayout>
        {!loading ? (
          <div className="w-full p">
            {anime
              ? anime.map((a) => (
                  <div className="w-full" key={a.id}>
                    <div className="relative">
                      <div className="w-full h-[300px] overflow-hidden flex justify-center items-center">
                        <picture>
                          <img
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL +
                              "/storage/" +
                              a.images
                            }
                            alt=""
                          />
                        </picture>
                      </div>
                      <div className="w-full h-[301px] absolute bg-gradient-to-b from-transparent to-white dark:to-black border-b-[1px] dark:border-b-[rgba(255,255,255,0.2)] top-0 left-0">
                        <div className="w-full h-full relative">
                          <div className="absolute bottom-0 left-0 p-8">
                            <div className="text-2xl font-semibold">
                              {a.title}
                            </div>
                            <div className="grid grid-cols-1 overflow-hidden my-2 truncate">
                              {a.descriptions}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {a.genres.map((g) => (
                                <div
                                  className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-[rgba(255,255,255,0.2)] text-sm"
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

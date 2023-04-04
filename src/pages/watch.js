import IndexLayout from "@/components/IndexLayout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function WatchPage() {
  const baseUrl = "http://localhost:8000";

  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState([]);
  const router = useRouter();

  const getVideo = useCallback(() => {
    axios
      .get(baseUrl + "/api/videos?slug=" + router.query.s)
      .then((res) => setVideo(res.data.data));
  }, [router]);

  useEffect(() => {
    getVideo();
  }, [getVideo]);
  return (
    <div className="w-screen h-screen overflow-hidden">
      <IndexLayout>
        {!loading ? (
          <div className="grid grid-cols-8 gap-4 p-8 pb-32">
            <div className="col-span-6 w-full">
              {video
                ? video.map((v) => (
                    <div className="w-full h-auto" key={v.id}>
                      <video controls>
                        <source src={baseUrl + "/storage/" + v.videos}></source>
                      </video>
                      <div className="text-lg my-2">{v.title}</div>
                      <div className="w-fit my-1 py-1 px-2 rounded-md text-sm bg-gray-100">100k x watched</div>
                      <Link href={"/anime?s="+v.anime.slug} className="my-2 w-[300px] h-fit p-2 rounded-xl border-[1px] flex items-center hover:bg-gray-100 cursor-pointer">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <picture>
                            <img
                              src={baseUrl + "/storage/" + v.anime.images}
                              className="h-8"
                              alt=""
                            />
                          </picture>
                        </div>
                        <span className="mx-2">{v.anime.title}</span>
                      </Link>
                      <div className="my-2">{v.descriptions}</div>
                    </div>
                  ))
                : ""}
            </div>
            <div className="w-full col-span-2">
              <div className="w-full h-auto">
                <div className="text-xs">Next</div>
                <div className="w-full h-auto mt-2">
                  <div className="rounded-xl overflow-hidden">
                    <picture>
                      <img
                        src="https://images2.alphacoders.com/516/516664.jpg"
                        className="w-full"
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="my-2 text-md">One Piece episode 1024</div>
                  <div className="flex flex-wrap">
                    <div className="py-1 px-2 bg-gray-100 rounded-md text-xs">
                      100k x watched
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto mt-2">
                <div className="text-xs">Previous</div>
                <div className="w-full h-auto mt-2">
                  <div className="rounded-xl overflow-hidden">
                    <picture>
                      <img
                        src="https://images2.alphacoders.com/516/516664.jpg"
                        className="w-full"
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="my-2 text-md">One Piece episode 1022</div>
                  <div className="flex flex-wrap">
                    <div className="py-1 px-2 bg-gray-100 rounded-md text-xs">
                      100k x watched
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-2" />
            </div>
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

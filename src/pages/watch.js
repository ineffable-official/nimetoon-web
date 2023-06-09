import IndexLayout from "@/components/IndexLayout";
import VideoPlayer from "@/components/VideoPlayer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function WatchPage() {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState([]);
  const [record, setRecord] = useState([]);
  const router = useRouter();
  const [startWatch, setStartWatch] = useState(0);
  const [endWatch, setEndWatch] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [userData, setUserData] = useState([]);

  const getVideo = useCallback(() => {
    if (router.query.s === undefined) {
      return;
    }
    axios
      .get(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/videos?slug=" +
          router.query.s +
          "&record=true"
      )
      .then((res) => {
        setVideo(res.data.data);
        setRecord(res.data.record);
      });
  }, [router]);

  const videoLoaded = (e) => {
    var count = 0;
    
    e.target.ontimeupdate = (evt) => {
      count += 1
      console.log(count);
    };
  };

  const videoEnd = () => {
    return;

    if (userData) {
      axios
        .post(
          process.env.NEXT_PUBLIC_BASE_URL +
            `/api/viewer?user=${userData.user.id}&video=${video[0].id}`,
          {},
          { headers: { Authorization: "Bearer " + userData.token } }
        )
        .then((res) => console.log(res.data))
        .catch((err) => {
          throw err;
        });
    }
  };

  useEffect(() => {
    getVideo();
  }, [getVideo]);

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden dark:bg-[#17181A] dark:text-white">
      <IndexLayout>
        {!loading ? (
          <div className="grid grid-cols-8 gap-4 p-8 pb-32">
            <div className="col-span-6 w-full">
              {video
                ? video.map((v) => (
                    <div className="w-full h-auto" key={v.id}>
                      <VideoPlayer
                        url={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          "/storage/" +
                          v.videos
                        }
                        videoName={v.title}
                        loaded={videoLoaded}
                        ended={videoEnd}
                      />
                      <div className="text-lg my-4">{v.title}</div>
                      <div className="w-fit my-2 py-1 px-2 rounded-md text-sm bg-gray-100 dark:bg-[rgba(255,255,255,0.1)] ">
                        {v.viewer + " x watched"}
                      </div>
                      <Link
                        href={"/anime?s=" + v.anime.slug}
                        className="my-4 w-[300px] h-fit p-2 rounded-xl border-[1px] flex items-center hover:bg-gray-100 cursor-pointer dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.25)] "
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <picture>
                            <img
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "/storage/" +
                                v.anime.images_square
                              }
                              className="h-8"
                              alt=""
                            />
                          </picture>
                        </div>
                        <span className="mx-2">{v.anime.title}</span>
                      </Link>
                      <div className="my-4 dark:text-gray-300">{v.descriptions}</div>
                    </div>
                  ))
                : ""}
            </div>
            <div className="w-full col-span-2">
              {record ? (
                record.next ? (
                  <div className="w-full h-auto">
                    <div className="text-xs">Next</div>
                    <div className="w-full h-auto mt-2">
                      <div className="rounded-xl overflow-hidden mb-2">
                        <picture>
                          <img
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL +
                              "/storage/" +
                              record.next.images
                            }
                            className="w-full"
                            alt=""
                          />
                        </picture>
                      </div>
                      <Link
                        href={"/watch?s=" + record.next.slug}
                        className="text-md hover:underline"
                      >
                        {record.next.title}
                      </Link>
                      <div className="flex flex-wrap mt-2">
                        <div className="py-1 px-2 bg-gray-100 rounded-md text-xs">
                          {record.next.viewer + " x watched"}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {record ? (
                record.previous ? (
                  <div className="w-full h-auto mt-2">
                    <div className="text-xs">Previous</div>
                    <div className="w-full h-auto mt-2">
                      <div className="rounded-xl overflow-hidden mb-2">
                        <picture>
                          <img
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL +
                              "/storage/" +
                              record.previous.images
                            }
                            className="w-full"
                            alt=""
                          />
                        </picture>
                      </div>
                      <Link
                        href={"/watch?s=" + record.previous.slug}
                        className="text-md hover:underline"
                      >
                        {record.previous.title}
                      </Link>
                      <div className="flex flex-wrap mt-2">
                        <div className="py-1 px-2 bg-gray-100 rounded-md text-xs">
                          {record.previous.viewer + " x watched"}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <hr className="my-2 dark:border-[rgba(255,255,255,0.1)]" />
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

import axios from "axios";
import { useEffect, useState } from "react";

export default function VideoForm(props) {
  const [title, setTitle] = useState();
  const [slug, setSlug] = useState();
  const [animeTitle, setAnimeTitle] = useState();

  const [animeSelected, setAnimeSelected] = useState();
  const [anime, setAnime] = useState([]);

  const animeChange = (e) => {
    setAnimeTitle(e.target.value);
    if (e.target.value !== "") {
      document.getElementById("anime-options").style.display = "flex";
    }

    axios
      .get(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/animes?search=" +
          e.target.value
      )
      .then((res) => setAnime(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const selectAnime = (e) => {
    setAnimeTitle(e.title);
    setAnimeSelected(e.id);
    document.getElementById("anime-options").style.display = "none";
    document.getElementById("anime-input").value = e.title;
    setAnime([]);
  };

  useEffect(() => {
    setTitle(props.data ? props.data.title : "");
    setSlug(props.data ? props.data.slug : "");
    setAnimeSelected(
      props.data
        ? props.data.anime
          ? props.data.anime.id
          : undefined
        : undefined
    );
    setAnimeTitle(
      props.data ? (props.data.anime ? props.data.anime.title : "") : ""
    );
  }, [props]);

  return (
    <div className="w-full h-auto">
      <h1 className="font-semibold text-xl">Add Videos</h1>
      <form action="" className="mt-4" onSubmit={props.submit}>
        <div className="mb-2">
          <input
            type="text"
            name="title"
            id=""
            className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="slug"
            id=""
            className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]"
            placeholder="Slug"
            onChange={(e) => setSlug(e.target.value)}
            value={slug}
          />
        </div>

        <div className="mb-2 relative">
          <input
            type="text"
            onChange={animeChange}
            className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]"
            placeholder="Anime"
            id="anime-input"
            value={animeTitle}
          />
          <input type="hidden" name="anime" value={animeSelected} />
          <div
            className="w-full h-auto absolute bg-white p-2 border-[1px] flex-col rounded-lg z-50 hidden dark:border-[rgba(255,255,255,0.1)] dark:bg-[#17181A]"
            id="anime-options"
          >
            {anime
              ? anime.map((t) => (
                  <div
                    className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg dark:border-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
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
            className="w-full h-auto border-[1px] rounded-lg outline-none text-sm p-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]"
            placeholder="Descriptions"
            value={props.data ? props.data.descriptions : ""}
          ></textarea>
        </div>
        <div className="mb-2 overflow-hidden">
          <label htmlFor="images" className="text-xs">
            Thumbnail
          </label>
          <input className="text-sm" type="file" name="images" id="images" />
        </div>
        <div className="mb-2 overflow-hidden flex flex-col">
          <label htmlFor="videos" className="text-xs">
            Video
          </label>
          <input className="text-sm" type="file" name="videos" id="Videos" />
        </div>
        {props.uploadProgress > 0 ? (
          <div className="mb-2">
            <div className="flex w-full h-1 bg-[rgba(255,255,255,0.2)] rounded-full">
              <div
                className="h-1 bg-red-500 rounded-full transition-all duration-100 ease-in-out"
                style={{ width: `${props.uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="w-full h-11 bg-black text-white rounded-lg text-sm dark:hover:border-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
        >
          Save
        </button>
      </form>
    </div>
  );
}

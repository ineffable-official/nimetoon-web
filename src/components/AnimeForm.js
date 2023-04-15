import axios from "axios";
import { useEffect, useReducer, useState } from "react";

export default function AnimeForm(props) {
  const [userData, setUserData] = useState([]);

  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);
  const [studio, setStudio] = useState([]);
  const [season, setSeason] = useState([]);
  const [genre, setGenre] = useState([]);

  const [typeSelected, setTypeSelected] = useState(undefined);
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [studioSelected, setStudioSelected] = useState(undefined);
  const [seasonSelected, setSeasonSelected] = useState(undefined);

  const [title, setTitle] = useState();
  const [slug, setSlug] = useState();
  const [episode, setEpisode] = useState();
  const [animeType, setAnimeType] = useState();
  const [animeStatus, setAnimeStatus] = useState();
  const [animeStudio, setAnimeStudio] = useState();
  const [animeSeason, setAnimeSeason] = useState();
  const [airedFrom, setAiredFrom] = useState();
  const [airedTo, setAiredTo] = useState();
  const [descriptions, setDescriptions] = useState();

  const [genres, setGenres] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getGenres = (token) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/genres", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setGenres(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const optionChange = (e, elementID, apiRoute, outputState) => {
    if (e.target.value !== "") {
      document.getElementById(elementID).style.display = "flex";
    }

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/${apiRoute}?search=${e.target.value}`,
        {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      )
      .then((res) => outputState(res.data.data))
      .catch((err) => {
        throw err;
      });
  };

  const selectOption = (
    e,
    finalState,
    updateState,
    optionID,
    inputID,
    outputState
  ) => {
    finalState(e.id);
    updateValue(e.name);
    document.getElementById(optionID).style.display = "none";
    document.getElementById(inputID).value = e.name;
    outputState([]);
  };

  const selectGenre = (e) => {
    const g = genre;
    if (g.includes(e.id)) {
      const index = g.indexOf(e.id);
      g.splice(index);
      setGenre(g);
      forceUpdate();
      return;
    }
    g.push(e.id);
    setGenre(g);
    forceUpdate();
  };

  const checkGenre = (e) => {
    const gen = genre;
    if (gen.includes(e.id)) return true;
  };

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  useEffect(() => {
    const getAllData = (userData) => {
      getGenres(userData.token);
    };

    if (userData && userData.token) {
      getAllData(userData);
    }
  }, [userData]);

  useEffect(() => {
    setTitle(props.data ? props.data.title : "");
    setSlug(props.data ? props.data.slug : "");
    setEpisode(props.data ? props.data.episode : "");
    setAnimeType(
      props.data ? (props.data.type ? props.data.type.name : "") : ""
    );
    setAnimeStatus(
      props.data ? (props.data.status ? props.data.status.name : "") : ""
    );
    setAnimeStudio(
      props.data ? (props.data.studio ? props.data.studio.name : "") : ""
    );
    setAnimeSeason(
      props.data ? (props.data.season ? props.data.season.name : "") : ""
    );
    setAiredFrom(props.data ? props.data.aired_from : "");
    setAiredTo(props.data ? props.data.aired_to : "");
    var genreList = [];
    props.data
      ? props.data.genres
        ? props.data.genres.forEach((g) => {
            genreList.push(g.id);
          })
        : ""
      : "";

    setGenre(genreList);
    setDescriptions(props.data ? props.data.descriptions : "");
  }, [props]);

  return (
    <div className="w-full h-auto">
      <h1 className="font-semibold text-xl">Add Animes</h1>
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
        <div className="mb-2">
          <input
            type="number"
            name="episodes"
            id=""
            className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]"
            placeholder="Episodes"
            onChange={(e) => setEpisode(e.target.value)}
            value={episode}
          />
        </div>
        <div className="mb-2 relative">
          <input
            type="text"
            onChange={(e) => optionChange(e, "type-options", "types", setType)}
            className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]"
            placeholder="Type"
            id="type-input"
            value={animeType}
          />
          <input type="hidden" name="type" value={typeSelected} />
          <div
            className="w-full h-auto absolute bg-white p-2 border-[1px] flex-col rounded-lg z-50 hidden dark:border-[rgba(255,255,255,0.1)] dark:bg-[#17181A]"
            id="type-options"
          >
            {type
              ? type.map((t) => (
                  <div
                    className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg dark:border-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
                    key={t.id}
                    onClick={(e) =>
                      selectOption(
                        t,
                        setTypeSelected,
                        setAnimeType,
                        "type-options",
                        "type-input",
                        setType
                      )
                    }
                  >
                    {t.name}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="mb-2 relative">
          <input
            type="text"
            onChange={(e) =>
              optionChange(e, "status-options", "statuses", setStatus)
            }
            className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)] "
            placeholder="Status"
            id="status-input"
            value={animeStatus}
          />
          <input type="hidden" name="status" value={statusSelected} />
          <div
            className="w-full h-auto absolute bg-white p-2 border-[1px] hidden flex-col rounded-lg z-50 dark:border-[rgba(255,255,255,0.1)] dark:bg-[#17181A]"
            id="status-options"
          >
            {status
              ? status.map((t) => (
                  <div
                    className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg dark:hover:bg-[rgba(255,255,255,0.1)] "
                    key={t.id}
                    onClick={(e) =>
                      selectOption(
                        t,
                        setStatusSelected,
                        setAnimeStatus,
                        "status-options",
                        "status-input",
                        setStatus
                      )
                    }
                  >
                    {t.name}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="mb-2 relative">
          <input
            type="text"
            onChange={(e) =>
              optionChange(e, "studio-options", "studios", setStudio)
            }
            className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]"
            placeholder="Studio"
            id="studio-input"
            value={animeStudio}
          />
          <input type="hidden" name="studio" value={studioSelected} />
          <div
            className="w-full h-auto absolute bg-white p-2 border-[1px] hidden flex-col rounded-lg z-50 dark:border-[rgba(255,255,255,0.1)] dark:bg-[#17181A]"
            id="studio-options"
          >
            {studio
              ? studio.map((t) => (
                  <div
                    className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg dark:hover:bg-[rgba(255,255,255,0.1)]"
                    key={t.id}
                    onClick={(e) =>
                      selectOption(
                        t,
                        setStudioSelected,
                        setAnimeStudio,
                        "studio-options",
                        "studio-input",
                        setStudio
                      )
                    }
                  >
                    {t.name}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="mb-2 relative">
          <input
            type="text"
            onChange={(e) =>
              optionChange(e, "season-options", "seasons", setSeason)
            }
            className="w-full h-11 px-4 border-[1px] rounded-lg text-sm outline-none focus:border-gray-500 border-gray-300 dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.1)]"
            placeholder="Season"
            id="season-input"
            value={animeSeason}
          />
          <input type="hidden" name="season" value={seasonSelected} />
          <div
            className="w-full h-auto absolute bg-white p-2 border-[1px] hidden flex-col rounded-lg z-50 dark:border-[rgba(255,255,255,0.1)] dark:bg-[#17181A]"
            id="season-options"
          >
            {season
              ? season.map((t) => (
                  <div
                    className="w-full h-10 flex items-center justify-center text-xs hover:bg-gray-100 rounded-lg dark:hover:bg-[rgba(255,255,255,0.1)]"
                    key={t.id}
                    onClick={(e) =>
                      selectOption(
                        t,
                        setSeasonSelected,
                        setAnimeSeason,
                        "season-options",
                        "season-input",
                        setSeason
                      )
                    }
                  >
                    {t.name}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="" className="text-xs">
            Aired From
          </label>
          <input
            type="date"
            name="aired_from"
            id=""
            className="w-full h-11 border-[1px] rounded-lg px-4 text-sm dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)]"
            value={airedFrom}
            onChange={(e) => setAiredFrom(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="" className="text-xs">
            Aired To
          </label>
          <input
            type="date"
            name="aired_to"
            id=""
            className="w-full h-11 border-[1px] rounded-lg px-4 text-sm dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)]"
            value={airedTo}
            onChange={(e) => setAiredTo(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <div className="text-xs">Genres</div>
          <div className="flex gap-2 my-2 pb-2 overflow-x-scroll">
            {genres
              ? genres.map((g) => (
                  <div
                    className="p-2 py-1 text-xs bg-gray-100 dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:border-[1px] border-0 cursor-pointer"
                    style={{
                      backgroundColor: checkGenre(g)
                        ? "rgb(255,255,255,0.5)"
                        : "",
                    }}
                    key={g.id}
                    onClick={() => selectGenre(g)}
                  >
                    {g.name}
                  </div>
                ))
              : ""}
          </div>
          <input type="hidden" name="genres" value={JSON.stringify(genre)} />
        </div>
        <div className="mb-2">
          <textarea
            name="descriptions"
            id=""
            cols="30"
            rows="10"
            className="w-full h-auto border-[1px] rounded-lg outline-none text-sm p-4 dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)]"
            placeholder="Descriptions"
            value={descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-2 overflow-hidden">
          <label htmlFor="images" className="text-xs">
            Thumbnail
          </label>
          <input className="text-sm" type="file" name="images" id="images" />
        </div>
        <div className="mb-2 overflow-hidden">
          <label htmlFor="images" className="text-xs">
            Image Square
          </label>
          <input
            className="text-sm"
            type="file"
            name="images_square"
            id="images_square"
          />
        </div>
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

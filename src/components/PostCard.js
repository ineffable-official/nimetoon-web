import Link from "next/link";

export default function PostCard(props) {
  return (
    <div className="w-full h-auto hover:border-[1px] dark:hover:border-[rgba(255,255,255,0.1)] p-2 rounded-xl dark:text-white">
      <div className="rounded-xl overflow-hidden">
        <picture>
          <img
            src={
              process.env.NEXT_PUBLIC_BASE_URL + "/storage/" + props.data.images
            }
            alt=""
          />
        </picture>
      </div>
      <div className="flex flex-col">
        <Link
          href={"/watch?s=" + props.data.slug}
          className="text-lg hover:underline mt-2"
        >
          {props.data.title}
        </Link>
        <div className="flex my-2">
          <div className="p-1 px-2 bg-gray-50 dark:bg-[rgba(255,255,255,0.1)] rounded-lg text-xs">
            {props.data.viewer + " x watched"}
          </div>
        </div>
        <div className="w-full my-1 text-gray-500 dark:text-gray-400  truncate text-sm">
          {props.data.descriptions}
        </div>
        <Link
          href={"/anime?s=" + props.data.anime.slug}
          className="w-full h-auto flex my-2 p-2 bg-gray-100 dark:bg-[rgba(255,255,255,0.1)] hover:bg-gray-200 rounded-xl items-center"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <picture>
              <img
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  "/storage/" +
                  props.data.anime.images_square
                }
                className="h-10"
                alt=""
              />
            </picture>
          </div>
          <span className="ml-2 text-sm">{props.data.anime.title}</span>
        </Link>
      </div>
    </div>
  );
}

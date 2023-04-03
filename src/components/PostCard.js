import Link from "next/link";

export default function PostCard(props) {
  return (
    <div className="w-[350px] h-auto hover:border-[1px] p-2 rounded-xl">
      <div className="rounded-xl overflow-hidden">
        <picture>
          <img src={props.data.images} alt="" />
        </picture>
      </div>
      <div className="flex flex-col">
        <Link href={"/"} className="text-lg hover:underline mt-2">{props.data.title}</Link>
        <div className="flex my-2">
          <div className="p-1 px-2 bg-gray-50 rounded-lg text-xs">100k watched</div>
        </div>
        <Link href="/" className="w-full h-auto flex my-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-xl items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <picture>
              <img src={props.data.images} className="h-10" alt="" />
            </picture>
          </div>
          <span className="ml-2 text-sm">One Piece</span>
        </Link>
      </div>
    </div>
  );
}

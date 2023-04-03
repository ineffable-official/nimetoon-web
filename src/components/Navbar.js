import Link from "next/link";

export default function Layout() {
  return (
    <div className="w-full h-auto flex flex-wrap px-8 py-2 border-b-[1px]">
      <Link href={"/"} className="w-auto h-11 flex items-center justify-center">
        NIMETOON
      </Link>
      <form action="" className="mx-auto">
        <div className="flex relative">
          <input
            className="w-[400px] h-11 px-6 border-[1px] rounded-full focus:border-gray-400 outline-none"
            type="search"
            name="s"
            id="search"
            placeholder="Search ..."
          />
          <button className="w-11 h-11 absolute right-0 text-gray-400 flex items-center justify-center">
            <i className="fa-light fa-search"></i>
          </button>
        </div>
      </form>
			<div className="flex gap-1">
				<div className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100">
					<i className="fa-light fa-moon"></i>
				</div>
				<div className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100">
					<i className="fa-light fa-bell"></i>
				</div>
				<div className="w-11 h-11 cursor-pointer flex items-center justify-center rounded-lg hover:bg-gray-100">
					<i className="fa-light fa-circle-user"></i>
				</div>
			</div>
    </div>
  );
}

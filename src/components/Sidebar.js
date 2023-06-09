import Link from "next/link";

export default function Sidebar() {
  
  return (
    <div className="w-[250px] h-screen flex flex-col p-2 dark:text-white dark:bg-[#17181A]">
      <Link
        href={"/"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:hover:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-house"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Home</div>
      </Link>
      <Link
        href={"/"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:hover:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-history"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">History</div>
      </Link>
      <Link
        href={"/"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:hover:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-fire"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Trendings</div>
      </Link>
      <hr className="my-2 border-[rgba(255,255,255,0.2)]" />
      <Link
        href={"/"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:hover:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-clock"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Watch Laters</div>
      </Link>
      <Link
        href={"/"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:hover:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-rectangle-history"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Collections</div>
      </Link>
      <Link
        href={"/"}
        className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600 dark:hover:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
      >
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-cog"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Settings</div>
      </Link>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="w-[250px] h-screen border-r-[1px] flex flex-col p-2">
      <div className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600">
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-house"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Home</div>
      </div>
      <div className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600">
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-history"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">History</div>
      </div>
      <div className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600">
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-fire"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Trendings</div>
      </div>
      <hr className="my-2" />
      <div className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600">
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-clock"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Watch Laters</div>
      </div>
      <div className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600">
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-rectangle-history"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Collections</div>
      </div>
      <div className="w-full h-11 flex hover:bg-gray-100 rounded-lg text-gray-600">
        <div className="w-11 h-11 flex items-center justify-center">
          <i className="fa-light fa-cog"></i>
        </div>
        <div className="h-11 ml-2 flex items-center text-sm">Settings</div>
      </div>
    </div>
  );
}

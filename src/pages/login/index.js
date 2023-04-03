export default function IndexLogin() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-auto h-auto p-4">
        <h1 className="font-semibold my-4 text-xl">Login</h1>
        <form action="">
          <div className="flex mb-2">
            <div className="w-11 h-11 flex items-center justify-center border-[1px] rounded-l-lg">
              <i className="fa-light fa-circle-user"></i>
            </div>
            <input
              type="text"
              className="w-[250px] h-11 text-sm outline-none border-[1px] border-l-0 px-4 rounded-r-lg"
              name="username"
              id="username"
              placeholder="Username or email"
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 flex items-center justify-center border-[1px] rounded-l-lg">
              <i className="fa-light fa-key"></i>
            </div>
            <input
              type="text"
              className="w-[250px] h-11 text-sm outline-none border-[1px] border-l-0 px-4 rounded-r-lg"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button
            className="w-full h-11 flex items-center justify-center border-[1px] rounded-xl hover:bg-black hover:text-white transition-all ease-in-out duration-150 text-sm"
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

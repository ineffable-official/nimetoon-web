import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function IndexLogin() {
  

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formError, setFormError] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/login", form)
      .then((res) => {
        setTimeout(() => {
          if (res.data.status) {
            localStorage.setItem("user-data", JSON.stringify(res.data.data));
            if (res.data.data.user.role === "admin") {
              router.push("/admin");
            } else {
              router.push("/");
            }

            setLoading(false);
          }
          setFormError(res.data.message);
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-auto h-auto p-4">
        <h1 className="font-semibold my-4 text-xl">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="flex mb-2">
            <div className="w-11 h-11 flex items-center justify-center border-[1px] rounded-l-lg border-r-0">
              <i className="fa-light fa-circle-user"></i>
            </div>
            <input
              type="text"
              className="w-[250px] h-11 text-sm outline-none border-[1px] px-4 rounded-r-lg"
              name="username"
              id="username"
              placeholder="Username or email"
              style={{
                borderColor: formError ? (formError.username ? "red" : "") : "",
              }}
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 flex items-center justify-center border-[1px] rounded-l-lg border-r-0">
              <i className="fa-light fa-key"></i>
            </div>
            <input
              type="password"
              className="w-[250px] h-11 text-sm outline-none border-[1px] px-4 rounded-r-lg"
              name="password"
              id="password"
              placeholder="Password"
              style={{
                borderColor: formError ? (formError.password ? "red" : "") : "",
              }}
            />
          </div>
          <button
            className="w-full h-11 flex items-center justify-center border-[1px] rounded-xl hover:bg-black hover:text-white transition-all ease-in-out duration-150 text-sm"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="w-10 h-10 flex items-center justify-center animate-spin">
                <i className="fa-light fa-spinner"></i>
              </div>
            ) : (
              "LOGIN"
            )}
          </button>
          <Link
            href={"/signup"}
            className="w-full h-11 flex items-center justify-center border-[1px] rounded-xl hover:bg-black hover:text-white transition-all ease-in-out duration-150 text-sm cursor-pointer mt-2"
          >
            SIGNUP
          </Link>
        </form>
      </div>
    </div>
  );
}

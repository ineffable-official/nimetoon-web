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

    const pass = document.getElementById("password").value;
    const confimPass = document.getElementById("confirmation-password").value;

    if (pass !== confimPass) {
      return false;
    }

    setLoading(true);

    const form = new FormData(e.target);

    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/signup", form)
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
    <div className="w-screen h-screen flex items-center justify-center dark:bg-[#17181A] dark:text-white">
      <div className="w-auto h-auto p-4">
        <h1 className="font-semibold my-4 text-xl">Signup</h1>
        <form onSubmit={onSubmit}>
          <div className="flex mb-2">
            <div className="w-11 h-11 flex items-center justify-center border-[1px] rounded-l-lg border-r-0 dark:border-[rgba(255,255,255,0.1)]"></div>
            <input
              type="text"
              className="w-[250px] h-11 text-sm outline-none border-[1px] px-4 rounded-r-lg dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)]"
              name="name"
              id="name"
              placeholder="Your Name"
              style={{
                borderColor:
                  formError !== null ? (formError.name ? "red" : "") : "",
              }}
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 flex items-center dark:border-[rgba(255,255,255,0.1)] justify-center border-[1px] rounded-l-lg border-r-0">
              <i className="fa-light fa-circle-user"></i>
            </div>
            <input
              type="text"
              className="w-[250px] h-11 text-sm outline-none border-[1px] px-4 rounded-r-lg dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)]"
              name="username"
              id="username"
              placeholder="Username"
              style={{
                borderColor:
                  formError !== null ? (formError.username ? "red" : "") : "",
              }}
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 flex dark:border-[rgba(255,255,255,0.1)] items-center justify-center border-[1px] rounded-l-lg border-r-0">
              <i className="fa-light fa-at"></i>
            </div>
            <input
              type="email"
              className="w-[250px] h-11 text-sm outline-none border-[1px] px-4 rounded-r-lg dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)]"
              name="email"
              id="email"
              placeholder="Email"
              style={{
                borderColor: formError ? (formError.email ? "red" : "") : "",
              }}
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 flex items-center dark:border-[rgba(255,255,255,0.1)] justify-center border-[1px] rounded-l-lg border-r-0">
              <i className="fa-light fa-key"></i>
            </div>
            <input
              type="password"
              className="w-[250px] h-11 text-sm outline-none border-[1px] px-4 rounded-r-lg dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)]"
              name="password"
              id="password"
              placeholder="Password"
              style={{
                borderColor: formError ? (formError.password ? "red" : "") : "",
              }}
            />
          </div>
          <div className="flex mb-2">
            <div className="w-11 h-11 flex items-center dark:border-[rgba(255,255,255,0.1)] justify-center border-[1px] rounded-l-lg border-r-0"></div>
            <input
              type="password"
              className="w-[250px] h-11 text-sm outline-none border-[1px] px-4 rounded-r-lg dark:bg-[rgba(255,255,255,0.1)] dark:border-[rgba(255,255,255,0.1)]"
              name="confirmation-password"
              id="confirmation-password"
              placeholder="Confirmation Password"
              style={{
                borderColor: formError
                  ? formError.confirmation_password
                    ? "red"
                    : ""
                  : "",
              }}
            />
          </div>
          <button
            className="w-full h-11 flex items-center dark:border-[rgba(255,255,255,0.1)] justify-center border-[1px] rounded-xl hover:bg-black hover:text-white transition-all ease-in-out duration-150 text-sm"
            type="submit"
            disabled={loading}
            id="submit-btn"
          >
            {loading ? (
              <div className="w-10 h-10 flex items-center justify-center animate-spin">
                <i className="fa-light fa-spinner"></i>
              </div>
            ) : (
              "SIGNUP"
            )}
          </button>
          <Link
            href={"/login"}
            className="w-full h-11 flex items-center dark:border-[rgba(255,255,255,0.1)] justify-center border-[1px] rounded-xl hover:bg-black hover:text-white transition-all ease-in-out duration-150 text-sm cursor-pointer mt-2"
          >
            LOGIN
          </Link>
        </form>
      </div>
    </div>
  );
}

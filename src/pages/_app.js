import Script from "next/script";
import "../styles/globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <Script src="/js/fontawesome.js" />
      <Component {...pageProps} />
    </>
  );
}

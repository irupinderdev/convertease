import Navbar from "@/components/Navbar";
import Textform from "@/components/Textform";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Textform />
      <Component {...pageProps} />
    </div>
  );
}

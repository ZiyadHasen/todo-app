import image from "@/assets/Image/bigcover.png";
import leftimg from "@/assets/Image/insidecover.png";
import logo from "@/assets/Image/logo.svg";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main
      className="font-josefin relative flex min-h-screen w-full justify-center overflow-x-hidden bg-cover bg-center md:items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-4 my-12 flex flex-col sm:flex-row">
        <div
          className="relative h-[280px] w-[340px] rounded-t-md rounded-b-none bg-cover bg-center sm:h-[580px] sm:w-[400px] sm:rounded-md lg:h-[600px] lg:w-[490px]"
          style={{ backgroundImage: `url(${leftimg})` }}
        >
          <div className="absolute inset-1/2 flex aspect-square h-[75%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 rounded-sm bg-white/20 backdrop-blur-md lg:w-[80%] lg:gap-6">
            <img src={logo} alt="Logo of the app" className="max-w-[60%]" />
            <h1 className="text-center text-3xl tracking-wide text-white sm:text-4xl md:text-5xl">
              Your Notes
            </h1>
          </div>
        </div>
        <div className="font-josefin bg-white">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

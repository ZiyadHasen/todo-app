import image from "@/assets/Image/bigcover.png";
import leftimg from "@/assets/Image/insidecover.png";
import logo from "@/assets/Image/logo.svg";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main
      className="relative flex min-h-screen w-full justify-center overflow-x-hidden bg-cover bg-center md:items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 mx-4 flex flex-col py-4 sm:flex-row">
        <div
          className="relative h-[280px] w-[340px] rounded-md bg-cover bg-center sm:h-[500px] sm:w-[400px] lg:h-[600px] lg:w-[490px]"
          style={{ backgroundImage: `url(${leftimg})` }}
        >
          <div className="absolute inset-1/2 flex aspect-square h-[75%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 rounded-sm bg-white/20 backdrop-blur-md lg:w-[80%] lg:gap-6">
            <img src={logo} alt="Logo of the app" className="max-w-[60%]" />
            <h1 className="text-center text-3xl tracking-wide text-white sm:text-4xl md:text-5xl">
              Your Notes
            </h1>
          </div>
          <div className="absolute bottom-2 left-2 text-lg font-bold text-white/80 sm:text-xl md:text-2xl">
            Ar
          </div>
        </div>
        <div className="h-[450px] w-[340px] rounded-md sm:h-[500px] sm:w-[400px] lg:h-[600px] lg:w-[490px]">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

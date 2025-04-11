import image from "@/assets/Image/bigcover.png";
import leftimg from "@/assets/Image/insidecover.png";
import logo from "@/assets/Image/logo.svg";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex flex-col md:flex-row mx-3 items-center justify-center w-full max-w-5xl ">
        <div
          className=" hidden md:block w-full max-w-md aspect-[5/6] relative bg-cover bg-center"
          style={{ backgroundImage: `url(${leftimg})` }}
        >
          <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-4/5 h-3/4 aspect-square gap-6 bg-white/20 backdrop-blur-md rounded-sm">
            <img src={logo} alt="Logo of the app" className="max-w-[60%]" />
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl tracking-wide text-center">
              Your Notes
            </h1>
          </div>
          <div className="absolute bottom-2 left-2 text-white/80 text-lg sm:text-xl md:text-2xl font-bold">
            Ar
          </div>
        </div>
        <div className="w-full  max-w-md aspect-[5/6] flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

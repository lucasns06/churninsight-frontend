import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="bg-[#f4f5ff]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
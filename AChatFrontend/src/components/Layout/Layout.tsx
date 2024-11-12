import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import s from "./Layout.module.css";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }

    return () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("room_access_token");
    };
  }, []);

  return (
    <>
      <div className={s.layout}>
        <Header />
        <main className={s.main_container}>
          <div className={s.content_container}>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;

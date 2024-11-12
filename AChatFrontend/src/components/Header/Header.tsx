/// <reference types="vite-plugin-svgr/client" />

import s from "./Header.module.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Link from "../Link/Link";
import Button from "../Button/Button";
import { getUsername } from "../../services/api";

const Header = () => {
  //0 = search rooms
  //1 = my rooms
  const [selectedSection, setSelectedSection] = useState<number>(0);

  const location = useLocation();

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await getUsername();
      setUsername(username.username);
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    let pathname = location.pathname;

    if (pathname.charAt(pathname.length - 1) == "/") {
      pathname = pathname.slice(0, pathname.length - 1);
    }

    if (pathname.endsWith("search_rooms")) {
      setSelectedSection(0);
    } else if (pathname.endsWith("my_rooms")) {
      setSelectedSection(1);
    }
  }, [location.pathname]);

  const onExit = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("room_access_token");
    window.location.href = "/";
  };

  return (
    <>
      <header className={s.header}>
        <div className={s.header_elements_div}>
          <p className={s.title}>AChat</p>
          <p className={s.subtext}>developed by red_aulex</p>
        </div>
        <nav className={s.header_nav_div}>
          <Link
            to={"/search_rooms"}
            text="Room Searcher"
            active={selectedSection == 0}
            onClick={() => setSelectedSection(0)}
          />
          <Link
            to={"/my_rooms"}
            text="My Rooms"
            active={selectedSection == 1}
            onClick={() => setSelectedSection(1)}
          />
        </nav>
        <div className={s.header_action_button_div}>
          <Button text="Exit" onClick={onExit} />
          <p className={s.subtitle}>{username}</p>
        </div>
      </header>
    </>
  );
};

export default Header;

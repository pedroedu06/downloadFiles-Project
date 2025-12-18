import "./App.css";
import { getCurrentWindow } from '@tauri-apps/api/window';
import { IoIosSearch } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import VideoGrid from './components/VideoGrid';


function App() {
  const [open, setOpen] = useState(true);

  const close = () => {
    getCurrentWindow().close();
  };
  const minizimize = () => {
    getCurrentWindow().minimize();
  };

  return (
    <div className="mainContainer">
      <section className="titlebar">
        <button className="close-bar" onClick={close}>X</button>
        <button className="minimize-bar" onClick={minizimize}>-</button>
      </section>

      <section className="searchbar-configbtns">
        <div className="search-bar-container">
          <label htmlFor="search-bar-url">Busca: </label>
          <input type="search" className="search-bar" name="search-bar-url" placeholder="Buscar o video" />
          <button className="download-btn"><IoMdDownload /></button>
        </div>
        <div className="buttons-config">
          <button className="updatepage-btn"><GrUpdate /></button>
          <button className="settings-btn"><CiSettings /></button>
        </div>
      </section>

      <section className="YT-Feed">
        <VideoGrid />
      </section>

      {open && <div className="sidebar-backdrop" />}

      <div className="side-bar" style={{ position: "relative" }}>
        <div
          className="sidebar-container"
          style={{
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span style={{ opacity: open ? 1 : 0, transition: "opacity 0.2s" }}>aa</span>
        </div>
        <button
          className="sidebar-toggle-btn"
          style={{
            position: "absolute",
            top: "16px",
            right: open ? "330px" : "0px",
            zIndex: 3,
            height: "46px",
            width: "40px",
            background: "rgb(56, 58, 75)",
            border: "none",
            borderRadius: "16px 0 0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "right 0.35s cubic-bezier(.4,0,.2,1), background 0.2s, border-radius 0.2s",
          }}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="arrow"
            style={{
              fontSize: 35,
              color: "#fff",
              transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              userSelect: "none",
            }}
          >
            <MdKeyboardArrowLeft />
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;
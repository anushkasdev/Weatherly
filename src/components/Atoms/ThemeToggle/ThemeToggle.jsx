import React, { useState, useEffect } from "react";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const [lightMode, setLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    const body = document.body;
    body.addEventListener("click",(e)=>{
      e.target.style.backgroundImage = "none";
    })
    if (lightMode) {
      document.documentElement.classList.add("light");
      body.style.backgroundImage = "linear-gradient(135deg, #d4b3d7ff,#cb7dcaff)";
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      body.style.background = "linear-gradient(135deg, #600b99ff, #432c64ff)";
      localStorage.setItem("theme", "dark");
    }
  }, [lightMode]);

  return (
    <div className="theme-toggle-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={lightMode}
          onChange={() => setLightMode((prev) => !prev)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

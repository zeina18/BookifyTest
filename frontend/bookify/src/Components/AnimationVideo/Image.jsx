import React, { useState } from "react";
import style from "./Image.module.css";

export default function Video({ isZoomed }) {
  return (
    <img
      className={`${style.bgVideo} ${isZoomed ? style.zoomIn : ""}`}
      src="/Imgs/LoginBg.jpg"
    />
  );
}

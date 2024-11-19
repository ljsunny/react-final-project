import {  Routes, Route } from "react-router-dom";
import PlayDetail from "./PlayDetail";
import PlayList from "./PlayList";
import { useState, useEffect } from "react";
import HttpService from "../../services/HttpService";

export default function PlayHome() {
  const [musics, setMusics] = useState([]);
  useEffect(() => {
    fetch("/music.json")
    .then((response) => response.json())
    .then((data) => setMusics(data))
    .catch((error) => console.error("Error ", error));
  }, []);

  return (
      <Routes>
        <Route index element={<PlayList musics={musics} />} />
        <Route path="play-detail/:id" element={<PlayDetail />} />
      </Routes>
  );
}

import {  Routes, Route } from "react-router-dom";
import PlayDetail from "./PlayDetail";
import PlayList from "./PlayList";
import { useState, useEffect } from "react";
import HttpService from "../../services/HttpService";

export default function PlayHome() {
  const [musics, setMusics] = useState([]);
  const loadUserData = () => {
    HttpService.get("music.json").then(
      (res) => {
        setMusics(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
      <Routes>
        <Route index element={<PlayList musics={musics} />} />
        <Route path="play-detail/:id" element={<PlayDetail />} />
      </Routes>
  );
}

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Audio from "../../components/Audio";
import "../../css/playList.css";
import HttpService from "../../services/HttpService";

// for recent played music //
function addRecentPlay(music) {
  const recentPlays = JSON.parse(localStorage.getItem("recentPlays")) || [];
  const updatedPlays = [music, ...recentPlays.filter((item) => item.id !== music.id)];
  localStorage.setItem("recentPlays", JSON.stringify(updatedPlays.slice(0, 20)));//store recent played music up to 20
}
//////

export default function PlayDetail() {
  const { id } = useParams(); // bring id from Param
  const [music, setMusic] = useState(null);

  useEffect(() => {
    HttpService.get("music.json").then(
      (res) => {
        const foundMusic = res.data.find((item) => item.id === Number(id));

        setMusic(foundMusic);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [id]);
//to show recent play in profile page//
  useEffect(() => {
    if (music) {
      addRecentPlay(music);
    }
  }, [music]);
///////////////////////
  if (!music) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="d-flex flex-column"
      style={{height:'100vh', width: "100%", justifyContent: "center", alignItems: "center",backgroundColor:'#FAFAFA' }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems:"center",
          position: "fixed",
          top: 0,
          padding: "36px",
          fontWeight: 700,
          backgroundColor: "#fafafa",
          zIndex:1
        }}
      >
        <Link
          to="/play"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: "#e6e6e6",
            padding: "10px",
            width: "32px",
            height: "32px",
          }}
        >
          <img src="/svg/leftArrow.svg" />
        </Link>
        <span>Now Playing</span>
        <span></span>
      </div>
      <div style={{width:'80%'}}>
        <div style={{ marginBottom: "32px" }}>
          <img
            src={music.img}
            style={{width:'100%', height:'370px', borderRadius: "30px", objectFit:'cover'}}
          /> 
        </div>
        <div style={{marginBottom:'32px'}}>
          <h1>{music.name}</h1>
          <p>{music.artist}</p>
        </div>
          <Audio src={music.src} duration={music.duration}/>
      </div>
    </div>
  );
}

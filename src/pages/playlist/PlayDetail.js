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
    useEffect(() => {
      fetch("music.json")
        .then((response) => response.json())
        .then((data) =>{
          const foundMusic = res.data.find((item) => item.id === Number(id));
          setMusic(foundMusic)
        } )
        .catch((error) => console.error("Error ", error));
    }, []);
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
    <div id="playDetail">
      <div className="detail-nav">
        <Link
          to="/play/"
          className="link"
        >
          <img src={`${process.env.PUBLIC_URL}/svg/leftArrow.svg`} />
        </Link>
        <span>Now Playing</span>
        <span></span>
      </div>
      <div className="main">
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/${music.img}`}
            style={{width:'100%', height:'370px', borderRadius: "30px", objectFit:'cover'}}
          /> 
        </div>
        <div>
          <h1>{music.name}</h1>
          <p>{music.artist}</p>
        </div>
        <Audio src={`${process.env.PUBLIC_URL}/${music.src}`} duration={music.duration}/>
      </div>
    </div>
  );
}

import "../../css/playList.css"
import { useNavigate } from "react-router-dom";
//a parameter of "isProfile = false" is for profile page
export default function PlayList({musics, isProfile = false}) {
  console.log(musics)
  const navigate = useNavigate();
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  return (
    <>
    <div className="row justify-content-center align-items-start g-2 mt-3 w-full">
      <div className="col-11">
        {/* display h1 only for Playlist page */}
      {!isProfile && <h1>PlayList</h1>}
        <table>
          <thead>
            <tr>
              <th></th>
              <th>title</th>
              <th>artist</th>
              <th>duration</th>
            </tr>
          </thead>
          <tbody>
            {musics.map((music) => {
              return (
                <tr key={music.id} onClick={()=>{
                  navigate(`/play/play-detail/${music.id}`)
                }}>
                  <td>
                    <div className="play-icon">
                      <img src="/svg/playBtn.svg" />
                    </div>
                  </td>
                  <td style={{fontWeight:700}}>{music.name}</td>
                  <td>{music.artist}</td>
                  <td>{formatTime(music.duration)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

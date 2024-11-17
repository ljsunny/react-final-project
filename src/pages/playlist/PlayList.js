import "../../css/playList.css"
import { useNavigate } from "react-router-dom";
export default function PlayList({musics}) {
  const navigate = useNavigate();
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  function truncateString(str, endIdx) {
    if (str.length > endIdx) {
      return str.substring(0, endIdx) + '...';
    } else {
      return str;
    }
  }
  
  return (
    <>
    <div className="row justify-content-center align-items-start g-2 mt-3 w-full">
      <div style={{display:'flex',width:'100%', overflow:'hidden', marginLeft: '50px', }}>
          {
            musics.map((music)=>{
              return (
              <div>
                <img style={{width:'146px',height:'185px', borderRadius:'30px', marginRight:'14px'}} src={music.img}/>
                <p>{truncateString(music.name, 15)}</p>
              </div>
              )
            })
          }
      </div>
      <div className="col-10">
        <h1>PlayList</h1>
        <table style={{marginTop:'20px', width:'100%'}}>
          {/* <thead>
            <tr>
              <th></th>
              <th>title</th>
              <th>artist</th>
              <th>duration</th>
            </tr>
          </thead> */}
          <tbody>
            {musics.map((music) => {
              return (
                <tr key={music.id} onClick={()=>{
                  navigate(`/play/play-detail/${music.id}`)
                }}>
                  <td style={{width:'50px', padding: '8px 0'}}>
                    <div className="play-icon">
                      <img src="/svg/playBtn.svg" />
                    </div>
                  </td>
                  <td ><p style={{fontWeight:700}}>{truncateString(music.name, 20)}</p><p>{music.artist}</p></td>
                  <td style={{textAlign:'center'}}>{formatTime(music.duration)}</td>
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

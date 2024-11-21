import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function Audio({src, duration}){
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);  // point state
  const [currentTime, setCurrentTime] =useState(0);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if(audioRef.current){
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setCurrentTime(audioRef.current.currentTime);
      setProgress(currentProgress);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    if(audioRef.current){
        audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleSongEnd = useCallback(() => {
    const newPoints = points + 2;
    setShowModal(true);
    setPoints(newPoints);
    if (!localStorage.getItem('points')) {
      localStorage.setItem('points', newPoints);  // localStorage에 포인트 저장
    } else {
      localStorage.setItem('points', Number(localStorage.getItem('points')) + 2);
    }
  }, [points]); // Add points as dependency to update it when it changes

  useEffect(() => {
    const audioElement = audioRef.current;
    // load point data from localStorage
    const savedPoints = localStorage.getItem('points');
    if (savedPoints) {
      setPoints(parseInt(savedPoints, 10));
    }

    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('ended', handleSongEnd);  // 노래 끝날 때 포인트 추가
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [handleSongEnd]);

  //close modal
  const handleClose = () => setShowModal(false);
  return (
    <div className="audio-player">
      <div className="player-controls">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="audio-progress"
        />
      </div>
      <div style={{marginBottom:'28px',display:'flex',justifyContent:'space-between',width:'100%'}}>
        <p>{formatTime(currentTime)}</p>
        <p>{formatTime(duration)}</p>
      </div>
      <button id="playBtn" onClick={handlePlayPause} style={{marginBottom:'28px'}}>
        {isPlaying ? <img src={`${process.env.PUBLIC_URL}/svg/StopBtn.svg`} alt=""/> : <img src={`${process.env.PUBLIC_URL}/svg/playBtn.svg`} alt=""/>}
      </button>
      <audio ref={audioRef} src={src} />
      {

        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                  You got 2 points. Your Total point is {points}.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
    
    
  );
};

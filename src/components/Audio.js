import React, { useState, useRef, useEffect } from 'react';

export default function Audio({src, duration}){
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);  // 노래 포인트 상태
  const audioRef = useRef(null);

  useEffect(() => {
    // load point data from localStorage
    const savedPoints = localStorage.getItem('points');
    if (savedPoints) {
      setPoints(parseInt(savedPoints, 10));
    }

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleSongEnd);  // 노래 끝날 때 포인트 추가
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const handleSongEnd = () => {
    // When music end, user get 
    const newPoints = points + 2;
    setPoints(newPoints);
    if(!localStorage.getItem)
      localStorage.setItem('points', newPoints);  // localStorage에 포인트 저장
    else {
      localStorage.setItem('points',Number(localStorage.getItem('points'))+2);
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

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
        <p>{formatTime(progress)}</p>
        <p>{formatTime(duration)}</p>
      </div>
      {/* <div className="points-display">
            <p>Points: {points}</p>
          </div> 
      */}
        <a onClick={handlePlayPause} style={{marginBottom:'28px'}}>
          {isPlaying ? <img src="/svg/StopBtn.svg"/> : <img src="/svg/StopBtn.svg"/>}
        </a>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

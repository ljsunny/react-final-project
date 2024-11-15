import React, { useState, useRef, useEffect } from 'react';

export default function Audio({src, duration}){
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);  // 노래 포인트 상태
  const audioRef = useRef(null);

  useEffect(() => {
    // localStorage에서 포인트를 불러오기
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
    // 노래가 끝났을 때 포인트 10점 추가 (여기서 포인트 증가 로직을 수정할 수 있음)
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
      <div>
        <p>{formatTime(duration)}</p>
      </div>
      {/* <div className="points-display">
        <p>Points: {points}</p>
      </div> */}
      <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

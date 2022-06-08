import {useEffect, useRef, useState} from 'react';
import './App.scss';

function App() {
  const audioRef = useRef(null);
  const moveRef = useRef(null);
  const inpRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const handleClick = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      moveRef.current.style.opacity = 0;
      audio.pause();
      setIsPlaying(false);
    } else {
      moveRef.current.style.opacity = 1;
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleUpdate = () => {
    const audio = audioRef.current;
    const {currentTime} = audio;

    currentTime - time >= 1 && setTime(Math.floor(currentTime));
  }

  const handleRefresh = () => {
    audioRef.current.currentTime = 0;
    setTime(0);
  }

  const handleChangeInput = (e) => {
    const {target} = e;

    const value = Math.floor(audioRef.current.duration / 100 * target.value);

    setTime(value);
    audioRef.current.currentTime = value;
  }

  useEffect(() => {
    moveRef.current.style.opacity = 0;
  }, []);

  return (
    <div className="App">
      <div className="for">Ты лучше всех! <span>&#10084;</span></div>
      <div className="button" onClick={handleClick}>
        {
          isPlaying
            ? <span><i className="fa fa-pause"></i></span>
            : <span style={{paddingLeft: '8px'}}><i className="fa fa-play"></i></span>
        }
        <audio ref={audioRef} onTimeUpdate={handleUpdate} onEnded={() => {
          setIsPlaying(false);
          setTime(0);
          inpRef.current.value = 0;
          moveRef.current.style.opacity = 0;
        }}>
          <source src="KENTUKKI%20-%20Замигает%20свет.mp3"/>
        </audio>
      </div>
      <div className="what"><span>Зажигает свет</span><span>{time}s/233s</span></div>
      <div>
        <input type="range" ref={inpRef} onInput={handleChangeInput} defaultValue={0}/>
      </div>
      <div ref={moveRef} className="move bottom">
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="refresh" onClick={handleRefresh}>Сначала</div>
    </div>
  );
}

export default App;

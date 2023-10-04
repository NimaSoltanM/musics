import { FiPlay, FiSkipBack, FiSkipForward, FiPause } from 'react-icons/fi';
import { formatTime } from '../utils/utils';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

export default function MusicPlayer({
  audioRef,
  onToggle,
  isPlaying,
  onChangeSong,
  duration,
  setIsPlaying,
}) {
  const [time, setTime] = useState(0);

  const handleTimeUpdate = () => {
    setTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioRef]);

  useEffect(() => {
    audioRef.current.onended = () => {
      audioRef.current.currentTime = 0;
      setTime(0);
      setIsPlaying(false);
    };
  }, []);

  const sliderHandlers = (e) => {
    audioRef.current.currentTime = e.target.value;
    setTime(e.target.value);
  };

  return (
    <div className='music-player-container'>
      <div>
        <div>
          <button onClick={() => onChangeSong('PREV')}>
            <FiSkipBack size='1.75rem' />
          </button>
          <button onClick={onToggle}>
            {isPlaying ? <FiPause size='1.75rem' /> : <FiPlay size='1.75rem' />}
          </button>
          <button onClick={() => onChangeSong('NEXT')}>
            <FiSkipForward size='1.75rem' />
          </button>
        </div>
        <div>
          <p>{formatTime(time)}</p>
          <input
            type='range'
            id='mySlider'
            min={0}
            max={duration}
            value={time}
            onChange={sliderHandlers}
          />
          <p>{formatTime(duration)}</p>
        </div>
      </div>
    </div>
  );
}

MusicPlayer.propTypes = {
  audioRef: PropTypes.object,
  onToggle: PropTypes.func,
  isPlaying: PropTypes.bool,
  onChangeSong: PropTypes.func,
  duration: PropTypes.number,
  setIsPlaying: PropTypes.func,
};

import { useState, useRef } from 'react';

import MusicPicker from './components/MusicPicker';
import MusicsList from './components/MusicsList';
import MusicPlayer from './components/MusicPlayer';
import { getDuration } from './utils/utils';

function App() {
  const [songs, setSongs] = useState([]);
  const [url, setUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSongIndex, setActiveSongIndex] = useState(0);

  const audioRef = useRef(null);

  const addSongHandler = async (files) => {
    files = Array.from(files);

    const newSongs = await Promise.all(
      files.map(async (file) => {
        const duration = await getDuration(file);
        return {
          file,
          isActive: false,
          duration,
        };
      })
    );

    const isDuplicated = newSongs.some((newSong) =>
      songs.some((song) => song.file.name === newSong.file.name)
    );

    if (isDuplicated) {
      alert('Duplicated song!');
      return;
    }

    setSongs((prevSongs) => [...prevSongs, ...newSongs]);
  };

  const playSongHandler = (index) => {
    setActiveSongIndex(index);
    const song = songs[index];

    setSongs((prevSongs) =>
      prevSongs.map((songItem) => {
        return songItem === song
          ? { ...songItem, isActive: true }
          : { ...songItem, isActive: false };
      })
    );

    const { file } = song;

    const newUrl = URL.createObjectURL(file);

    if (url) {
      URL.revokeObjectURL(url);
    }

    setUrl(newUrl);

    setIsPlaying(false);
  };

  const togglePlayHandler = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if (audioRef.current.played) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const changeSongHandler = (action) => {
    let nextIndex;

    if (action === 'NEXT') {
      nextIndex = (activeSongIndex + 1) % songs.length;
    } else if (action === 'PREV') {
      nextIndex = (activeSongIndex - 1 + songs.length) % songs.length;
    }

    playSongHandler(nextIndex);
  };

  return (
    <>
      <div className='container'>
        <MusicPicker onAdd={addSongHandler} />

        <MusicsList songs={songs} onClick={playSongHandler} />
      </div>

      <audio src={url} ref={audioRef} />

      {songs.length && url ? (
        <MusicPlayer
          audioRef={audioRef}
          onToggle={togglePlayHandler}
          isPlaying={isPlaying}
          onChangeSong={changeSongHandler}
          duration={songs[activeSongIndex].duration}
          setIsPlaying={setIsPlaying}
        />
      ) : null}
    </>
  );
}

export default App;

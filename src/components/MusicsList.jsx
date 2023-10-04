import PropTypes from 'prop-types';
import { formatTime } from '../utils/utils';

export default function MusicsList({ songs, onClick }) {
  return (
    <div className='songs-list'>
      {songs.map((song, index) => (
        <div
          key={song.file.name}
          className={`song ${song.isActive && 'active'}`}
          onClick={() => onClick(index)}
        >
          <span className='name'>{song.file.name}</span>
          <span className='duration'>{formatTime(song.duration)}</span>
        </div>
      ))}
    </div>
  );
}

MusicsList.propTypes = {
  songs: PropTypes.array,
  onClick: PropTypes.func,
};

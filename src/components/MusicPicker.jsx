import PropTypes from 'prop-types';

export default function MusicPicker({ onAdd }) {
  const handleFileSelect = (e) => {
    onAdd(e.target.files);
  };

  return (
    <div className='music-picker'>
      <input
        type='file'
        multiple
        accept='.mp3, .wav, .ogg'
        onChange={handleFileSelect}
      />
    </div>
  );
}

MusicPicker.propTypes = {
  onAdd: PropTypes.func,
};

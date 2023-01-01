import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../style/musiccard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    const { savedFavoritedSong, trackId } = this.props;
    const savedSong = savedFavoritedSong
      .some((favoritedSong) => favoritedSong.trackId === trackId);
    if (!savedSong) {
      this.setState({ isChecked: false });
    }
  }

    addToFavorites = async () => {
      const { trackName, previewUrl, trackId, onFavoritesUpdate } = this.props;
      const { isChecked } = this.state;
      if (!isChecked) {
        this.setState({ loading: false, isChecked: true });
        await addSong({ trackName, previewUrl, trackId });
        await onFavoritesUpdate();
      } else {
        this.setState({ loading: false, isChecked: false });
        await removeSong({ trackName, previewUrl, trackId });
        await onFavoritesUpdate();
      }
    }

    render() {
      const { previewUrl, trackName, trackId } = this.props;
      const { loading, isChecked } = this.state;
      return (
        <main>
          { loading ? <Loading />
            : (
              <div className="track-main">
                <p>
                  {trackName}
                </p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>

                <label htmlFor="favinput">
                  <input
                    data-testid={ `checkbox-music-${trackId}` }
                    id="favinput"
                    type="checkbox"
                    onChange={ this.addToFavorites }
                    checked={ isChecked }
                  />
                  Favoritar
                </label>
              </div>
            )}
        </main>
      );
    }
}

MusicCard.propTypes = {
  onFavoritesUpdate: PropTypes.func.isRequired,
  savedFavoritedSong: PropTypes.instanceOf(Array).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;

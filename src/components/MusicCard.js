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
    const { savedFavoritedSong } = this.props;
    const { favoritedSong: { trackId } } = this.props;
    const savedSong = savedFavoritedSong
      .some((favoritedSong) => favoritedSong.trackId === trackId);
    if (savedSong) {
      return this.setState({ isChecked: true });
    }
  }

    addToFavorites = async () => {
      const { favoritedSong } = this.props;
      const { isChecked } = this.state;
      if (isChecked) {
        this.setState({ loading: false, isChecked: false });
        await removeSong(favoritedSong);
      } else {
        this.setState({ loading: false, isChecked: true });
        await addSong(favoritedSong);
      }
    }

    render() {
      const { favoritedSong: { previewUrl, trackName, trackId } } = this.props;
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

                <label htmlFor="fav-input">
                  <input
                    data-testid={ `checkbox-music-${trackId}` }
                    id="fav-input"
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
  favoritedSong: PropTypes.instanceOf(Object).isRequired,
  savedFavoritedSong: PropTypes.instanceOf(Array).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;

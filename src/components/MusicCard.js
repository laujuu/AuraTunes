import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isChecked: false,
    };
  }

    addToFavorites = async () => {
      const { favoritedSong } = this.props;
      this.setState({ loading: true, isChecked: true });
      await addSong(favoritedSong);
      this.setState({ loading: false });
    }

    render() {
      const { favoritedSong: { previewUrl, trackName, trackId } } = this.props;
      const { loading, isChecked } = this.state;
      return (
        <main>
          { loading ? <Loading />
            : (
              <div>
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
                  Favorita
                </label>
              </div>
            )}
        </main>
      );
    }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  favoritedSong: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;

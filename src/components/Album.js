import propTypes from 'prop-types';
import React from 'react';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import '../style/albumcard.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songid: [],
      artistInfo: '',
      loading: false,
      favorites: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const getMusicID = await getMusics(id);
    const saveFavoritedStatus = await getFavoriteSongs();
    this.setState({
      songid: getMusicID,
      favorites: [saveFavoritedStatus],
      artistInfo: getMusicID[0],
      loading: false,
    });
  }

  onFavoritesUpdateList = async () => {
    const saveFavoritedStatus = await getFavoriteSongs();
    this.setState({ favorites: [saveFavoritedStatus] });
  }

  render() {
    const { songid, loading, artistInfo, favorites } = this.state;
    return (
      <main data-testid="page-album">
        <Header />
        { loading ? <Loading />
          : (
            <div className="album-card">
              <div>
                <img
                  src={ artistInfo.artworkUrl100 }
                  alt={ artistInfo.collectionName }
                />
                <h3 data-testid="artist-name">
                  {artistInfo.artistName}
                </h3>
                <h3 data-testid="album-name">
                  {artistInfo.collectionName}
                </h3>
              </div>
              <div>
                {songid
                  .filter((e) => e.kind)
                  .map((songInfo) => (
                    <div key={ songInfo.trackName }>
                      <MusicCard
                        trackName={ songInfo.trackName }
                        previewUrl={ songInfo.previewUrl }
                        tackId={ songInfo.trackId }
                        favoritedSong={ songInfo }
                        savedFavoritedSong={ favorites }
                        onFavoritesUpdate={ this.onFavoritesUpdateList }
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
      </main>

    );
  }
}

// referencia para o proptypes: https://stackoverflow.com/questions/47519612/eslint-match-is-missing-in-props-validation-react-prop-types
Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;

import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import MusicCard from './MusicCard';
import Loading from './Loading';
import '../style/favoritepage.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const getFav = await getFavoriteSongs();
    this.setState({ favorites: [...getFav], loading: false });
  }

  onFavoritesUpdateList = async () => {
    const getFav = await getFavoriteSongs();
    this.setState({ favorites: [...getFav] });
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          <h1 className="fav-title">Favorites</h1>
          <div className="fav-tracks">
            { loading ? <Loading /> : favorites.map((fav) => (
              <MusicCard
                key={ fav.trackId }
                trackName={ fav.trackName }
                previewUrl={ fav.previewUrl }
                trackId={ fav.trackId }
                savedFavoritedSong={ favorites }
                onFavoritesUpdate={ this.onFavoritesUpdateList }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;

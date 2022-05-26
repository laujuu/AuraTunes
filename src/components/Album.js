import propTypes from 'prop-types';
import React from 'react';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songid: [],
      artistInfo: '',
      loading: false,
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const getMusicID = await getMusics(id);
    this.setState({ songid: getMusicID, artistInfo: getMusicID[0], loading: false });
  }

  render() {
    const { songid, loading, artistInfo } = this.state;
    console.log('aaaaaaaa', songid[1]);
    return (
      <main data-testid="page-album">
        <Header />
        { loading ? <Loading />
          : (
            <div>
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
                  .map(({
                    trackName, previewUrl,
                  }) => (
                    <div key={ trackName }>
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

import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../style/searchpage.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      artist: '',
      loading: false,
      isButtonDisabled: true,
      onLoad: [],
    };
  }

  onInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      [event.target.name]: value,
    }, () => {
      const { name } = this.state;
      if (name.length >= 2) {
        this.setState({
          isButtonDisabled: false,
        });
      }
    });
  }

   onButtonClick = async () => {
     const { name } = this.state;
     const albumAPI = await searchAlbumsAPI(name);
     this.setState({
       loading: false,
       onLoad: albumAPI,
       artist: name,
       name: '',
     });
   }

   render() {
     const {
       isButtonDisabled,
       name,
       artist,
       loading,
       onLoad,
     } = this.state;
     const { onButtonClick, onInputChange } = this;
     return (
       <main data-testid="page-search">
         <Header />
         <h1 className="search-title">Search</h1>
         { loading ? <Loading />
           : (
             <div className="main-section">
               <div>
                 <form className="main">
                   <label htmlFor="name">
                     <br />
                     <input
                       placeholder="Nome do Artista"
                       type="text"
                       name="name"
                       value={ name }
                       onChange={ onInputChange }
                       data-testid="search-artist-input"
                     />
                   </label>

                   <button
                     type="button"
                     disabled={ isButtonDisabled }
                     onClick={ onButtonClick }
                     data-testid="search-artist-button"
                   >
                     Procurar
                   </button>
                 </form>
               </div>
             </div>
           )}
         { onLoad.length === 0
           ? <p className="sub">Nenhum álbum foi encontrado</p>
           : (
             <div>
               <p className="sub">
                 {`Mostrando resultados para: ${artist}`}
               </p>
               <div className="album-section">
                 <div className="album-grid">
                   { onLoad.map(({
                     collectionId,
                     collectionName,
                     artistName,
                     artworkUrl100,
                   }) => (
                     <div className="album-info" key={ collectionId }>
                       <img
                         className="album-image"
                         src={ artworkUrl100 }
                         alt={ collectionName }
                       />
                       <div className="artist-info">
                         <h2>{artistName}</h2>
                         <p>{ `Album: ${collectionName}` }</p>
                         <Link
                           className="album-link"
                           data-testid={ `link-to-album-${collectionId}` }
                           to={ `/album/${collectionId}` }
                           onClick={ this.addToAlbum }
                         >
                           Conferir
                         </Link>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           ) }
       </main>
     );
   }
}

export default Search;

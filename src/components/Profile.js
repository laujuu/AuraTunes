import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
      userEmail: '',
      userDescription: '',
      imageUrl: '',
    };
  }

  componentDidMount = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({
      loading: false,
      userName: name,
      userEmail: email,
      userDescription: description,
      imageUrl: image,
    });
  }

  render() {
    const { loading, userName, userEmail, userDescription, imageUrl } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        <div>
          { loading ? <Loading />
            : (
              <div>
                <img src={ imageUrl } alt={ `Imagem de perfil de ${userName}` } />
                <p>{`Usuário: ${userName}`}</p>
                <p>{`Email: ${userEmail}`}</p>
                <p>{`Sobre: ${userDescription}`}</p>
                <br />
                <Link to="/profile/edit">Editar Perfil</Link>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Profile;

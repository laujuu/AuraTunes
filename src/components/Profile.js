import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';
import '../style/profile.css';

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
        <h1 className="profile-title">Profile</h1>
        <div>
          { loading ? <Loading />
            : (
              <div className="main-content">
                <img
                  className="profile-pic"
                  src={ imageUrl }
                  alt={ `Imagem de perfil de ${userName}` }
                />
                <h3>{`Usuário: ${userName}`}</h3>
                <h3>{`Email: ${userEmail}`}</h3>
                <h3>{`Sobre: ${userDescription}`}</h3>
                <br />
                <Link className="edit-link" to="/profile/edit">Editar Perfil</Link>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Profile;

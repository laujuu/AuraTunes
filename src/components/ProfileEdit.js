import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
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
    console.log(getUser());
    this.setState({
      loading: false,
      userName: name,
      userEmail: email,
      userDescription: description,
      imageUrl: image,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  formSubmit = async () => {
    const { history } = this.props;
    const { userName, userEmail, userDescription, imageUrl } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name: userName,
      email: userEmail,
      description: userDescription,
      image: imageUrl,
    });
    console.log('clicando');
    history.push('/profile');
  }

  render() {
    const { loading, userName, userEmail, userDescription, imageUrl } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>ProfileEdit</h1>
        <div>
          { loading ? <Loading />
            : (
              <form>
                <input
                  value={ userName }
                  name="userName"
                  type="text"
                  onChange={ this.handleChange }
                />
                <input
                  value={ userEmail }
                  name="userEmail"
                  type="email"
                  onChange={ this.handleChange }
                />
                <input
                  value={ userDescription }
                  name="userDescription"
                  type="textarea"
                  onChange={ this.handleChange }
                />
                <input
                  value={ imageUrl }
                  name="imageUrl"
                  type="text"
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  onClick={ this.formSubmit }
                >
                  Salvar
                </button>
              </form>
            ) }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default ProfileEdit;

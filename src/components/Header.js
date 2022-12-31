import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../style/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount = async () => {
    const userAPI = await getUser();
    this.setState({
      name: userAPI.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div className="header-links">
          <Link
            className="links"
            data-testid="link-to-search"
            to="/search"
          >
            {' '}
            Search
            {' '}

          </Link>
          <Link
            className="links"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            {' '}
            Favorites
            {' '}

          </Link>
          <Link
            className="links"
            data-testid="link-to-profile"
            to="/profile"
          >
            {' '}
            Profile
            {' '}

          </Link>
        </div>
        <div className="user-info">
          { loading ? <Loading />
            : <p className="user" data-testid="header-user-name">{` Olá, ${name}!`}</p>}
        </div>
      </header>
    );
  }
}

export default Header;

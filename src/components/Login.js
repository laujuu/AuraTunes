import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../style/loginpage.css';
import relaxingLogo from '../images/relaxing-beach-day.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isButtonDisabled: true,
      login: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const validation = 3;
    const { name, value } = event.target;
    if (value.length >= validation) {
      this.setState({ isButtonDisabled: false, [name]: value });
    }
  }

       onButtonClick = async () => {
         const { name } = this.state;
         this.setState({ loading: true });
         await createUser({ name });
         this.setState({ login: true, loading: false });
       }

       render() {
         const {
           isButtonDisabled,
           loading,
           login,
         } = this.state;

         return (
           <main className="login-main">
             { loading && <Loading /> }
             { login && <Redirect to="/search" /> }
             <img className="logoimg" src={ relaxingLogo } alt="couple relaxing" />
             <div className="loginForm" data-testid="page-login">
               <form className="main-left">
                 <div className="title-main">
                   <h1>Boas vindas à</h1>
                   <h1 className="txt">&nbsp;AuraTunes</h1>
                 </div>
                 <div className="subtitle">
                   <h3>Uma forma simples de gerenciar suas músicas</h3>
                 </div>
                 <label className="userInput" htmlFor="name">
                   Ensira seu usuário
                   <br />
                   <input
                     placeholder="Exemplo: Leoa Serena"
                     type="text"
                     name="name"
                     onChange={ this.onInputChange }
                     data-testid="login-name-input"
                   />
                 </label>
                 <br />
                 <br />
                 <button
                   type="button"
                   disabled={ isButtonDisabled }
                   onClick={ this.onButtonClick }
                   data-testid="login-submit-button"
                 >
                   Entrar
                 </button>
               </form>
             </div>
           </main>
         );
       }
}

export default Login;

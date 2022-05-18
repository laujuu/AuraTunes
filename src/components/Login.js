import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
           <main>
             { loading && <Loading /> }
             { login && <Redirect to="/search" /> }
             <div data-testid="page-login">
               <form className="main-left">
                 <label htmlFor="name">
                   Nome
                   <br />
                   <input
                     type="text"
                     name="name"
                     onChange={ this.onInputChange }
                     data-testid="login-name-input"
                   />
                 </label>

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

import React from 'react';
import logo from '../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <a href="https://nikitas.nomoredomains.work/">
        <img className="header__logo" src={logo} alt="результат регистрации" />
      </a>
      {!props.isLoading ? props.loggedIn ? (
        <div className="header__container">
          <p className="header__login">{props.email}</p>
          <button
            onClick={props.onSignOut}
            type="submit"
            className="header__button"
          >
            Выйти
          </button>
        </div>
      ) : location.pathname === '/sign-up' ? (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      ) : (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      ) : ''}
    </header>
  );
}

export default Header;

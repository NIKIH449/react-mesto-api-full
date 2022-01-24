import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onRegister(e) {
    e.preventDefault();
    props.onRegister(password, email);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  return (
    <section className="auth">
      <form className="auth__form" onSubmit={onRegister}>
        <div className="auth__container">
          <h2 className="auth__title">Регистрация</h2>
          <input
            value={email}
            onChange={handleChangeEmail}
            id="auth__input"
            type="email"
            name="email"
            className="auth__input"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={handleChangePassword}
            id="password"
            type="password"
            name="password"
            className="auth__input"
            placeholder="Пароль"
            minLength="6"
            maxLength="40"
            required
          />
        </div>
        <div className="auth__container">
          <button type="submit" className="auth__submit-button">
            Зарегистрироваться
          </button>
          <p className="auth__paragraph">
            Уже зарегистрированы?
            <Link to="/sign-in" className="auth__link">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Register

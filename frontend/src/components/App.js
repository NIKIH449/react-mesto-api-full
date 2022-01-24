import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import '../index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import * as auth from '../utils/auth';
import registered from '../images/registered.svg';
import notRegistered from '../images/notRegistered.svg';
import Preloader from './Preloader';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [card, setCard] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkValidity()
        .then((res) => {
          if (res) {
            setEmail(res.user.email);
            setLoggedIn(true);
            navigate('/');
            setData();
          }
        })
        .catch((err) => {
          console.log(err);
          setIsDataLoading(false);
        });
    } else {
      setIsDataLoading(false);
    }
  }, [navigate]);

  function setData() {
    const profileInfo = api.getUserInfo();
    const initialCards = api.getInitialCards();
    Promise.all([profileInfo, initialCards])
      .then((data) => {
        setCurrentUser(data[0].user);
        setCard(data[1].data.reverse());
        setIsDataLoading(false);
      })
      .catch((err) => {
        setIsDataLoading(false);
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCard((cards) =>
          cards.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCard((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function addCard(newCard) {
    setCard([newCard.data, ...card]);
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data.data);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data.data);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNewPlace(data) {
    api
      .setNewCard(data)
      .then((data) => {
        addCard(data);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function onRegister(password, email) {
    auth
      .signUp(password, email)
      .then(() => {
        setImage(registered);
        setTitle('Вы успешно зарегистирировались!');
        navigate('/sign-in');
      })
      .catch(() => {
        setImage(notRegistered);
        setTitle('Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(handleSingIn());
  }

  function onLogin(password, email) {
    auth
      .signIn(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate('/');
        setData();
      })
      .catch(() => {
        setImage(notRegistered);
        setTitle('Что-то пошло не так! Возможно, логин или пароль неверны.');
        handleSingIn();
      });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    navigate('/');
    setLoggedIn(false);
  }

  function handleSingIn() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          isLoading={isDataLoading}
          loggedIn={loggedIn}
          onSignOut={onSignOut}
        />
        {isDataLoading ? (
          <Preloader />
        ) : (
          <>
            <Routes>
              <Route
                path="/sign-up"
                element={<Register onRegister={onRegister} />}
              />
              <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Main
                      card={card}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      onCardClick={handleCardClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleNewPlace}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <InfoTooltip
              image={image}
              title={title}
              isOpen={registered && title && isInfoTooltipOpen}
              onClose={closeAllPopups}
            />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //  проверяем все ли впорядке с ответом
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(this._url + `/cards/${id}/likes`, {
      credentials: 'include',
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo(inputValue) {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({
        name: inputValue.name,
        about: inputValue.about,
      }),
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserAvatar(userAvatar) {
    return fetch(this._url + '/users/me/avatar', {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({
        avatar: userAvatar.avatar,
      }),
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setNewCard(inputValue) {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        name: inputValue.name,
        link: inputValue.link,
      }),
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  putLike(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      credentials: 'include',
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://api.nikitas.nomoredomains.rocks',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

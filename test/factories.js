function validUser() {
  return {
    email: 'test@gmail.com',
    password: 'password',
  }
}

function authRequest() {
  return {
    url: '/',
    method: 'POST',
    headers: {
      authorization: 'Bearer tokenexample',
    },
    body: {
      email: 'test@email.com',
      password: 'password',
    },
  }
}

module.exports = { validUser, authRequest }

// auth.js — gestion simple utilisateur

const Auth = {
  login(email, code) {
    const allowedEmail = VALID_CODES[code];

    if (allowedEmail && allowedEmail === email) {
      const token = "token_" + Math.random().toString(36).substring(2);
      localStorage.setItem("userId", email);
      localStorage.setItem("authToken", token);
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
  },

  isLoggedIn() {
    return !!localStorage.getItem("authToken");
  }
};


const VALID_CODES = {
  "STB#1001": "client1@mail.com",
  "STAR#1002": "client2@mail.com",
  "STAR#1003": "client3@mail.com"
};






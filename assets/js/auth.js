// auth.js — gestion simple utilisateur

const Auth = {
  login(userId, token) {
    localStorage.setItem("userId", userId);
    localStorage.setItem("authToken", token);
  },

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
  },

  isLoggedIn() {
    return !!localStorage.getItem("authToken");
  },

  getUserId() {
    return localStorage.getItem("userId");
  }
};

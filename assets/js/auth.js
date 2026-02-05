const VALID_CODES = [
  "STB-458901",
  "STB-992301",
  "STB-771101"
];

const Auth = {
  login(email, code) {
    if (VALID_CODES.includes(code)) {
      const token = "token_" + Math.random().toString(36).substring(2);

      localStorage.setItem("userId", email);
      localStorage.setItem("authToken", token);
      localStorage.setItem("accessCode", code);

      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
    localStorage.removeItem("accessCode");
  },

  isLoggedIn() {
    return !!localStorage.getItem("authToken");
  },

  getUserId() {
    return localStorage.getItem("userId");
  }
};

const VALID_CODES = [
  { code: "STB-458901", email: "user1@example.com" },
  { code: "STB-992301", email: "user2@example.com" },
  { code: "STB-771101", email: "user3@example.com" }
];

const Auth = {
  login(email, code) {
    const validEntry = VALID_CODES.find(entry => 
      entry.code === code && entry.email === email
    );

    if (validEntry) {
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

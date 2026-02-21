// Script d'initialisation de la base SQLite pour les codes et utilisateurs (ESM)
const main = async () => {
  const sqlite3pkg = await import('sqlite3');
  const { verbose } = sqlite3pkg.default;
  const sqlite3 = verbose();
  const db = new sqlite3.Database('./database.sqlite');

  db.serialize(() => {
    // Table des codes personnalisés
    db.run(`CREATE TABLE IF NOT EXISTS codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      utilise INTEGER DEFAULT 0,
      email_associe TEXT,
      date_utilisation DATETIME
    )`);

    // Table des utilisateurs
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      code_associe TEXT,
      date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(code_associe) REFERENCES codes(code)
    )`);

    console.log('Tables créées ou déjà existantes.');
    db.close();
  });
};


main();

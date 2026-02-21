import sqlite3 from 'sqlite3';

// Script pour afficher tous les utilisateurs et leur code associé
const { verbose } = sqlite3;
const sqlite3Instance = verbose();
const db = new sqlite3Instance.Database('./database.sqlite');

db.all('SELECT email, code_associe, date_inscription FROM users', [], (err, rows) => {
  if (err) {
    console.error('Erreur lecture utilisateurs:', err.message);
  } else {
    if (rows.length === 0) {
      console.log('Aucun utilisateur trouvé.');
    } else {
      console.log('Liste des utilisateurs :');
      rows.forEach(row => {
        console.log(`${row.email} | Code : ${row.code_associe} | Inscrit le : ${row.date_inscription}`);
      });
    }
  }
  db.close();
});

// Script pour afficher tous les utilisateurs et leur code associé
import sqlite3 from 'sqlite3';
const { verbose } = sqlite3;
const db = new (verbose())('./database.sqlite');

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

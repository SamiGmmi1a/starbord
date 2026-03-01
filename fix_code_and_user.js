// Script Node.js pour vérifier et corriger l'état d'un code dans la base SQLite

import sqlite3 from 'sqlite3';

const { verbose } = sqlite3;
const sqlite3Instance = verbose();
const db = new sqlite3Instance.Database('./database.sqlite');

// Utilisation : node fix_code_and_user.js STB-511401 test@user.com Steve
const [,, code, email, prenom] = process.argv;

if (!code || !email || !prenom) {
  console.error('Usage : node fix_code_and_user.js <code> <email> <prenom>');
  process.exit(1);
}

db.get('SELECT * FROM codes WHERE code = ?', [code], (err, row) => {
  if (err) {
    console.error('Erreur SQL:', err.message);
    db.close();
    return;
  }
  if (!row) {
    console.log('Code non trouvé dans la base.');
    db.close();
    return;
  }
  if (row.utilise === 0) {
    db.run('UPDATE codes SET utilise = 1, email_associe = ?, prenom_associe = ?, date_utilisation = CURRENT_TIMESTAMP WHERE code = ?', [email, prenom, code], function(err2) {
      if (err2) {
        console.error('Erreur lors de l’association:', err2.message);
      } else {
        console.log('Code mis à jour comme utilisé et associé à', email);
        db.run('INSERT OR IGNORE INTO users (email, prenom, code_associe) VALUES (?, ?, ?)', [email, prenom, code], function(err3) {
          if (err3) {
            console.error('Erreur création utilisateur:', err3.message);
          } else {
            console.log('Utilisateur ajouté ou déjà présent.');
          }
          db.close();
        });
      }
    });
  } else {
    console.log('Code déjà utilisé. Email associé :', row.email_associe);
    db.close();
  }
});

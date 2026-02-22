// Script pour générer un code STB-XXXX01 aléatoire et afficher les codes utilisés/non utilisés

import sqlite3 from 'sqlite3';
const { verbose } = sqlite3;
const sqlite3Instance = verbose();
const db = new sqlite3Instance.Database('./database.sqlite');

function randomCode() {
  // Génère un code de la forme STB-XXXX01
  const digits = Math.floor(1000 + Math.random() * 9000); // 4 chiffres
  const serial = '01'; // Peut être incrémenté si besoin
  return `STB-${digits}${serial}`;
}

const code = randomCode();
db.run('INSERT INTO codes (code, utilise) VALUES (?, 0)', [code], function(err) {
  if (err) {
    console.error('Erreur insertion code:', err.message);
  } else {
    console.log('Code généré et inséré :', code);
  }
  // Afficher tous les codes et leur état
  db.all('SELECT code, utilise, email_associe FROM codes', [], (err2, rows) => {
    if (err2) {
      console.error('Erreur lecture codes:', err2.message);
    } else {
      console.log('\nListe des codes :');
      rows.forEach(row => {
        console.log(`${row.code} | Utilisé : ${row.utilise ? 'Oui' : 'Non'}${row.email_associe ? ' | Email : ' + row.email_associe : ''}`);
      });
    }
    db.close();
  });
});

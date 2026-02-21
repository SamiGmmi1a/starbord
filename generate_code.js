// Script pour générer un code STB-XXXXXX aléatoire et afficher les codes utilisés/non utilisés
import sqlite3 from 'sqlite3';
const { verbose } = sqlite3;
const db = new (verbose())('./database.sqlite');

function randomCode() {
  const chars = '0123456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return 'STB-' + suffix;
}

const code = randomCode();
db.run('INSERT INTO codes (code) VALUES (?)', [code], function(err) {
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

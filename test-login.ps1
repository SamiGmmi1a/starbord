# Vérifier un identifiant de connexion dans la base SQLite

# Chemin vers sqlite3.exe (modifie si besoin)
$sqlitePath = "C:\\sqlite\\sqlite3.exe"
# Chemin vers la base (modifie si besoin)
$dbPath = "database.sqlite"

# Email et code à tester
$email = "louispro@gmail.com"
$code = "STB-450101"

# Requête SQL
$query = "SELECT * FROM users WHERE email = '$email' AND code_associe = '$code';"

# Exécution
& $sqlitePath $dbPath $query
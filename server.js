const express = require('express');
const app = express();

// Middleware pour vérifier l'heure de la requête
function checkWorkingHours(req, res, next) {
    const currentTime = new Date();
    const dayOfWeek = currentTime.getDay(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi
    const hour = currentTime.getHours(); // Heure de la requête

    // Vérifier si c'est un jour de travail (lundi à vendredi, 9h à 17h)
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 18) {
        return next(); // L'heure est dans la plage de travail
    } else {
        res.status(403).send('L\'application est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9h à 17h).');
    }
}

// Appliquer le middleware à toutes les routes
app.use(checkWorkingHours);


// Définir le dossier 'views' pour stocker les templates Pug
app.set('views', './app/views');
app.set('view engine', 'pug');

// Servir les fichiers statiques (CSS)
app.use(express.static('./app/public'));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.render('home');
});

// Route pour la page "Nos services"
app.get('/services', (req, res) => {
    res.render('services');
});

// Route pour la page "Nous contacter"
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Démarrer le serveur
const port = 8080;
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

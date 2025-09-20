// src/app.js

// -------------------
// ייבוא מודולים נדרשים
// -------------------
const express = require('express');
const path = require('path'); // מודול לעבודה עם נתיבי קבצים

// -------------------
// ייבוא קבצי הראוטים שלנו
// -------------------
const clientRoutes = require('./routes/clientRoutes');
const newClientRoutes = require('./routes/newClientRoutes');
const blogRoutes = require('./routes/blogRoutes');
// -------------------
// אתחול אפליקציית Express
// -------------------
const app = express();
const PORT = process.env.PORT || 3000;
// app.use(express.static(path.join(__dirname, '..', 'public')));

// -------------------
// הגדרת Middleware (תוכנות ביניים)
// -------------------

// Middleware שמאפשר ל-Express להבין בקשות עם גוף בפורמט JSON
app.use(express.json());

// Middleware שמגדיר את תיקיית 'public' כתיקייה סטטית.
// Express יגיש אוטומטית קבצים מתיקייה זו (כמו index.html, style.css)
// path.join(__dirname, '..', 'public') בונה את הנתיב המלא לתיקיית public
app.use(express.static(path.join(__dirname, '..', 'public/pages')));
app.use('/assets', express.static(path.join(__dirname, '..', 'public/assets')));

// Serve login.html for the /login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/pages', 'login.html'));
});

// Serve dashboard.html for the /dashboard route (protected)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/pages', 'dashboard.html'));
});

// Serve privacy-policy.html for the /privacy-policy route
app.get('/privacy-policy.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/pages', 'privacy-policy.html'));
});

// Serve cookie-policy.html for the /cookie-policy route
app.get('/cookie-policy.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/pages', 'cookie-policy.html'));
});


// -------------------
// הגדרת נתיבי API
// -------------------

// כל בקשה שתגיע לנתיב שמתחיל ב- /api/clients
// תועבר לטיפול של הראוטר שהגדרנו בקובץ clientRoutes.js
app.use('/api/clients', clientRoutes);
app.use('/api/new-clients', newClientRoutes);
app.use('/', blogRoutes);



// -------------------
// הפעלת השרת
// -------------------
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});

const express = require('express');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const { database } = require('./keys');

// Inicializamos la aplicación
const app = express();
app.use(bodyParser.json());

// Configuraciones (Settings)
app.set('port', process.env.PORT || 3001);

// Habilitar CORS
app.use(cors());

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas (URL de nuestro servidor)
app.use('/usuario', require('./routes/usuario_routes'));  // Rutas para Usuarios
app.use('/tarea', require('./routes/tarea_routes'));  // Rutas para Tareas
app.use('/categoria', require('./routes/categoria_routes'));  // Rutas para Categorías
app.use('/estado', require('./routes/estado_routes'));  // Rutas para Estados
app.use('/prioridad', require('./routes/prioridad_routes'));  // Rutas para Prioridades

// Archivos estáticos (Public)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});

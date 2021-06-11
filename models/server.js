const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            categoria: '/categoria',
            persona: '/persona',
            libro: '/libro'
        };

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.path.categoria, require('../routes/categoria'));
        this.app.use(this.path.persona, require('../routes/persona'));
        this.app.use(this.path.libro, require('../routes/libro'));
    }

    listen() {
        this.app.listen(this.port || 3000, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;
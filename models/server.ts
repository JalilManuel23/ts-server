import express, { Application } from 'express';
import userRouter from '../routes/usuario';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use( this.apiPaths.usuarios, userRouter );
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() )

        // Carpeta pública
        this.app.use( express.static('public') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en: ' + this.port);
        });
    }
}

export default Server;
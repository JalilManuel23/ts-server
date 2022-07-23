import express, { Application } from 'express';
import userRouter from '../routes/usuario';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
    }

    routes() {
        this.app.use( this.apiPaths.usuarios, userRouter );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en: ' + this.port);
        });
    }
}

export default Server;
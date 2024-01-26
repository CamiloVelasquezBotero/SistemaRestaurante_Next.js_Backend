import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDb from './config/db.js';
import usuariosRoute from './routes/usuariosRoute.js'
import pedidosRoute from './routes/pedidosRoute.js'
import clientesRoute from './routes/clientesRoute.js'
import productosRoute from './routes/productosRoute.js'
import categoriasRoute from './routes/categoriasRoute.js'

// Instancia express
const app = express();
app.use(express.json());

// Configuracion Envirnment Varibales
dotenv.config();

// Configuracion CORS
const whiteList = [process.env.FRONTEND_URL]
app.use( cors({origin: whiteList}) )

// Conexion DB MongoDB
conectarDb();


app.use('/api/usuarios', usuariosRoute);
app.use('/api/clientes', clientesRoute);
app.use('/api/pedidos', pedidosRoute);
app.use('/api/productos', productosRoute);
app.use('/api/categorias', categoriasRoute);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto: ', PORT)
})
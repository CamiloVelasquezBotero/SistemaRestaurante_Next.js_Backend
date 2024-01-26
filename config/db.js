import mongoose from 'mongoose';

const conectarDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }    
        );

        console.log('MongoDB Conectada Exitosamente')
    } catch (error) {
        console.error('Error al conectar la DB: ', error);
        process.exit(1);
    }
}

export default conectarDb;
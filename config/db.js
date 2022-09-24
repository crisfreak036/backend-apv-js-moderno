import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.log('Error al conectar a mongoDB');
        console.log(error);
        process.exit(1);
    }
}

export default connectDB
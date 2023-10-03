import mongoose from "mongoose"

const connectDB = async (DB_CONNECT) => {
    try {
        const DB_OPTIONS = {
            // dbName: "users"
        }
        await mongoose.connect(DB_CONNECT, DB_OPTIONS)
        console.log('Connected Successfully')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB
const mongoose = require('mongoose');
const connection = mongoose.connection;
const logger = require('./config/logger');

try {
    mongoose.connect(
        process.env.MONGO_URI, 
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    );

    connection.once('open', () =>  {
        logger.info("MongoDB database connection established successfully")
    }); 
} catch (error) {
    throw error;
}

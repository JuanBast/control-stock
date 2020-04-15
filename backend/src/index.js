async function main() {
    try{

        //** Environment Validator  */ 
        // require('./config/env-validator')
        const logger = require('./config/logger')
        const app = require('./server');
        require('./database');

        await app.listen(app.get('port'));
        logger.info('##################################################');
        logger.info('##               Server started!                ##');
        logger.info('##'+(' PID: ' + process.pid).padEnd(46, " ") + '##');
        logger.info('##'+(' Listening on port: ' + app.get('port')).padEnd(46, " ") + '##');
        logger.info('##################################################'); 
        
    } catch(error){
        throw error;
    }
};

main();
const { createLogger, format, transports } = require('winston')

module.exports = createLogger({
    level: process.env.LOGGER_LEVEL,
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf((msg) => `[${prettyTimeStamp(msg.timestamp)}] [${msg.level.toUpperCase()}] - ${msg.message}`)
    ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../../logs/app.log`
        }),
        new transports.Console()
    ]
})

function prettyTimeStamp(timestamp){
    const date = timestamp.substring(0,10)
    const time = timestamp.substring(11,timestamp.length - 1)
    return `${date} ${time}`
}
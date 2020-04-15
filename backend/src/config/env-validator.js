const joi = require('joi')

const envVarsSchema = joi.object({
    NODE_ENV: joi.string()
    .valid(['development', 'test', 'production'])
    .required(),
    PORT: joi.number()
    .required(),
    LOGGER_LEVEL: joi.string()
    .valid(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),
    MONGO_URI: joi.string()
    .required()
}).unknown()
  .required()


const { error, value: envVars} = joi.validate(process.env, envVarsSchema)

if(error){
    throw new Error(`Config validation error: ${error.message}`)
} else {
    console.log("Environment correctly configured!")
}
var enviroments = {};

enviroments.staging = {
    'port':3000,
    'envName':'staging'
};

enviroments.production = {
    'port':5000,
    'envName':'production'
};

var currentEnviroment = typeof(process.env.NODE_ENV)=='string'?process.env.NODE_ENV.toLowerCase():'';

var enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment]:enviroments.staging;

module.exports = enviromentToExport;
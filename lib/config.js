var enviroments = {};

enviroments.staging = {
    'httpPort':3000,
    'httpsPort':3001,
    'envName':'staging',
    'hashingSecret':'thisIsASecret',
    'maxChecks':5,
    'twilio':{
        'accountSid':'AC33fda0714f825d021c673b4be2264adb',
        'authToken':'54832bbe6e41b11809b245f8f473ff90',
        'fromPhone':'+12183964013'
    },
    'templateGlobals':{
        'appName': 'UptimeChecker',
        'companyName':'NotaRealCompany, Inc',
        'yearCreated':'2020',
        'baseUrl':'http://localhost:3000/'
    }
};

enviroments.testing = {
    'httpPort':4000,
    'httpsPort':4001,
    'envName':'testing',
    'hashingSecret':'thisIsASecret',
    'maxChecks':5,
    'twilio':{
        'accountSid':'AC33fda0714f825d021c673b4be2264adb',
        'authToken':'54832bbe6e41b11809b245f8f473ff90',
        'fromPhone':'+12183964013'
    },
    'templateGlobals':{
        'appName': 'UptimeChecker',
        'companyName':'NotaRealCompany, Inc',
        'yearCreated':'2020',
        'baseUrl':'http://localhost:3000/'
    }
};

enviroments.production = {
    'httpPort':5000,
    'httpsPort':5001,
    'envName':'production',
    'hashingSecret':'thisIsAlsoASecret',
    'maxChecks':5,
    'twilio':{
        'accountSid':'',
        'authToken':'',
        'fromPhone':''
    }
};

var currentEnviroment = typeof(process.env.NODE_ENV)=='string'?process.env.NODE_ENV.toLowerCase():'';

var enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment]:enviroments.staging;

module.exports = enviromentToExport;
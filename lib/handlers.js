var _data = require('./data');
var helpers = require('./helpers');

//Define the handlers
var handlers={};

// users
handlers.users = function(data, callback){
    var acceptableMethods = ['post','get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data, callback);
    }else{
        callback(405);
    }
};

handlers._users = {};

handlers._users.post = function(data, callback){
    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length>0? data.payload.firstName.trim() :false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length>0? data.payload.lastName.trim() :false;
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length ==10? data.payload.phone.trim() :false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length>0? data.payload.password.trim() :false;
    var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true? true :false;

    if(firstName && lastName && phone && password && tosAgreement){
        _data.read('users',phone, function(err, data){
            if(err){
              
                var hashedPassword = helpers.hash(password);
                if(hashedPassword) {
                    var userObject = {
                        'firstName':firstName,
                        'lastName':lastName,
                        'phone':phone,
                        'hashedPassword':hashedPassword,
                        'tosAgreement':true
                    }

                    _data.create('users',phone, userObject,function(err){
                        if(!err){
                            callback(200);
                        }else{
                            console.log(err);
                            callback(400,{'Error': 'Could not create the new user'});
                        }
                    });
                }else{
                    callback(500, {'Error':'Could not hash the user\'s password'});
                }
            } else {
                callback(400, {'Error':'A user with that phone number already exists'});
            }
        });
    }else{
        callback(400, {'Error':'missing required fields'});
    }
};

handlers._users.get = function(data, callback){
    var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length ==10? data.queryStringObject.phone.trim():false;
    if(phone){
        var token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length ==20? data.headers.token.trim():false;
        console.log(token);
        handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
            if(tokenIsValid){
                _data.read('users',phone,function(err, data){
                    if(!err && data){
                        delete data.hashedPassword;
                        callback(200, data);
                    }else{
                        callback(404);
                    }
                });
            }else{
                callback(403,{'Error':'Missing required token in header, or token is invalid'});
            }
        });
       
    }else{
        callback(400,{'Error':"missig required fields"});
    }
};

handlers._users.put = function(data, callback){

    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length>0? data.payload.firstName.trim() :false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length>0? data.payload.lastName.trim() :false;
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length ==10? data.payload.phone.trim() :false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length>0? data.payload.password.trim() :false;
    var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true? true :false;

    if(phone){
        if(firstName || lastName || password){
            var token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length ==20? data.headers.token.trim():false;
            handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
                if(tokenIsValid){
                    _data.read('users', phone, function(err,userData){
                        if(!err && userData){
                            if(firstName){
                                userData.firstName = firstName;
                            }
                            if(lastName){
                                userData.lastName = lastName;
                            }
        
                            if(password){
                                userData.hashedPassword = helpers.hash(password);
                            }
                            _data.update('users',phone, userData, function(err){
                                if(!err){
                                    callback(200);
                                }else{
                                    callback(500,{'Error':'Couldnot update the user'});
                                }
                            });
                        }else{
                            callback(400,{'Error':'The specified user does not exist'});
                        }
                    });
                }else{
                    callback(403,{'Error':'Missing required token in header, or token is invalid'});
                }
            });

        }else{
            callback(400,{"Error":"missing fields to update"});
        }
    }else{
        callback(400, {'Error':'missing required fields'});
    }

};

handlers._users.delete = function(data, callback){
    var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length ==10? data.queryStringObject.phone.trim():false;
    if(phone){
        var token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length ==20? data.headers.token.trim():false;

        handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
            console.log(tokenIsValid);
            if(tokenIsValid){
                _data.read('users',phone,function(err, data){
                    if(!err && data){
                        _data.delete('users', phone, function(err){
                            if(!err){
                                callback(200);
                            }else{
                                callback(500, {'Error':'Could not delete the specified user'})
                            }
                        });
                    }else{
                        callback(400, {'Error':'Could not find the specified user'});
                    }
                });
            }else{
                callback(403,{'Error':'Missing required token in header, or token is invalid'});
            }
        });

    }else{
        callback(400,{'Error':"missig required fields"});
    }
};

// users
handlers.tokens = function(data, callback){
    var acceptableMethods = ['post','get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._tokens[data.method](data, callback);
    }else{
        callback(405);
    }
};

handlers._tokens = {};

handlers._tokens.post = function(data, callback){
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length ==10? data.payload.phone.trim() :false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length>0? data.payload.password.trim() :false;

    if(phone && password){  
        _data.read('users', phone, function(err, userData){
            if(!err && userData){
                var hashedPassword = helpers.hash(password);
                if(hashedPassword == userData.hashedPassword){
                    var tokenId = helpers.createRandomString(20);
                    var expires = Date.now()+1000*60*60;
                    var tokenObject = {
                        'phone':phone,
                        'id':tokenId,
                        'expires':expires
                    };

                    _data.create('tokens', tokenId, tokenObject, function(err){
                        if(!err){
                            callback(200,tokenObject);
                        }else{
                            callback(500,{'Error':'Could not create the new token'});
                        }
                    });

                }else{
                    callback(400, {'Error':'Password did not match the specified user\'s stored password'});
                }
            }else{
                callback(400,{'Error':'Could not find the specified user'});
            }
        });

    }else{
        callback(400,{'Error':'Missing required fields'});
    }
}

handlers._tokens.get = function(data, callback){
  
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length ==20? data.queryStringObject.id.trim():false;
   
    if(id){
        _data.read('tokens',id,function(err, tokenData){
            if(!err && tokenData){
                callback(200, tokenData);
            }else{
                callback(404);
            }
        })
    }else{
        callback(400,{'Error':"missig required fields"});
    }
}

handlers._tokens.put = function(data, callback){
    var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length ==20? data.payload.id.trim() :false;
    var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true? true :false;

    if(id && extend){
        _data.read('tokens', id, function(err, tokenData){
            if(!err && tokenData){
                if(tokenData.expires > Date.now()){
                    tokenData.expires = Date.now() +1000 * 60 *60;
                    _data.update('tokens', id, tokenData, function(err){
                        if(!err){
                            callback(200);
                        }else{
                            callback(500,{'Error':'Could not updated the token\'s expiration '});
                        }
                    });
                }else{
                    callback(400,{'Error':'The token has already expired, and cannot be extended'});
                }
            } else {
                callback(400, {'Error':'Specified token does not exist.'});
            }
        });

    }else{
        callback(400,{'Error':'Missing required fields or feild(s) ar invalid'});
    }
}

handlers._tokens.delete = function(data, callback){
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length ==20? data.queryStringObject.id.trim():false;
    if(id){
        _data.read('tokens',id,function(err, data){
            if(!err && data){
                _data.delete('tokens', id, function(err){
                    if(!err){
                        callback(200);
                    }else{
                        callback(500, {'Error':'Could not delete the specified token'})
                    }
                });
            }else{
                callback(400, {'Error':'Could not find the specified token'});
            }
        })
    }else{
        callback(400,{'Error':"missig required fields"});
    }
}

handlers._tokens.verifyToken = function(id, phone, callback){
    _data.read('tokens', id, function(err, tokenData){
        if(!err && tokenData){
            if(tokenData.phone == phone && tokenData.expires > Date.now()){
                callback(true);
            }else{
                callback(false);
            }
        }else{
            callback(false);
        }
    });
}

// ping
handlers.ping = function(data, callback){
    callback(200);
};


//Not found handler 
handlers.notFound = function(data, callback){
    callback(404);
};

module.exports = handlers;
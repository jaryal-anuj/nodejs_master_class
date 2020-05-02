var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

//Define the handlers
var handlers={};
/**
 * 
 * Html handlers
 */
handlers.index = function(data,callback){
    if(data.method == 'get'){
        console.log("here");
        var templateData = {
            'head.title':'Uptime Monitoring - Made Simple',
            'head.description':'we offer free, simple uptime monitoring for HTTP/HTTPS sites of all kinds, when your site goes down, we\'ll send you text to let you know',
            'body.class':'index'
        };
        helpers.getTemplate('index',templateData, function(err,str){
            
            if(!err && str){
                
                helpers.addUniversalTemplates(str, templateData,function(err, str){
                    if(!err && str){
                        
                        callback(200, str, 'html');
                    }else{
                        
                        callback(500,undefined,'html');
                    }
                });
                
            }else{
               // console.log(err);
                callback(500,undefined,'html');
            }
        });
    }else{
        callback(405,undefined, 'html');
    }
};

handlers.accountCreate = function(data, callback){
    if(data.method == 'get'){
        console.log("here");
        var templateData = {
            'head.title':'Create and account',
            'head.description':'Sign up is easy and only take a few seconds',
            'body.class':'accountCreate'
        };
        helpers.getTemplate('accountCreate',templateData, function(err,str){
            
            if(!err && str){
                
                helpers.addUniversalTemplates(str, templateData,function(err, str){
                    if(!err && str){
                        
                        callback(200, str, 'html');
                    }else{
                        
                        callback(500,undefined,'html');
                    }
                });
                
            }else{
               // console.log(err);
                callback(500,undefined,'html');
            }
        });
    }else{
        callback(405,undefined, 'html');
    }
};


handlers.sessionCreate = function(data, callback){
    if(data.method == 'get'){

        var templateData = {
            'head.title':'Login to your account',
            'head.description':'Please enter your phone number and password to access your account',
            'body.class':'sessionCreate'
        };
        helpers.getTemplate('sessionCreate',templateData, function(err,str){
            
            if(!err && str){
                
                helpers.addUniversalTemplates(str, templateData,function(err, str){
                    if(!err && str){
                        
                        callback(200, str, 'html');
                    }else{
                        
                        callback(500,undefined,'html');
                    }
                });
                
            }else{
               // console.log(err);
                callback(500,undefined,'html');
            }
        });
    }else{
        callback(405,undefined, 'html');
    }
};


handlers.sessionDeleted = function(data, callback){
    if(data.method == 'get'){

        var templateData = {
            'head.title':'Logged out',
            'head.description':'You have been logged out of your account',
            'body.class':'sessionDeleted'
        };
        helpers.getTemplate('sessionDeleted',templateData, function(err,str){
            
            if(!err && str){
                
                helpers.addUniversalTemplates(str, templateData,function(err, str){
                    if(!err && str){
                        
                        callback(200, str, 'html');
                    }else{
                        
                        callback(500,undefined,'html');
                    }
                });
                
            }else{
               // console.log(err);
                callback(500,undefined,'html');
            }
        });
    }else{
        callback(405,undefined, 'html');
    }
};


handlers.favicon = function(data, callback){
    if(data.method == 'get'){
        helpers.getStaticAsset('favicon.ico',function(err, data){
            if(!err && data){
                callback(200, data, 'favicon');
            }else{
                callback(500);
            }
        });
    }else{
        callback(405);
    }
};

// Edit Your Account
handlers.accountEdit = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Account Settings',
        'body.class' : 'accountEdit'
      };
      // Read in a template as a string
      helpers.getTemplate('accountEdit',templateData,function(err,str){
        if(!err && str){
          // Add the universal header and footer
          helpers.addUniversalTemplates(str,templateData,function(err,str){
            if(!err && str){
              // Return that page as HTML
              callback(200,str,'html');
            } else {
              callback(500,undefined,'html');
            }
          });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
  };


  // Account has been deleted
handlers.accountDeleted = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Account Deleted',
        'head.description' : 'Your account has been deleted.',
        'body.class' : 'accountDeleted'
      };
      // Read in a template as a string
      helpers.getTemplate('accountDeleted',templateData,function(err,str){
        if(!err && str){
          // Add the universal header and footer
          helpers.addUniversalTemplates(str,templateData,function(err,str){
            if(!err && str){
              // Return that page as HTML
              callback(200,str,'html');
            } else {
              callback(500,undefined,'html');
            }
          });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
  };


  // Create a new check
handlers.checksCreate = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Create a New Check',
        'body.class' : 'checksCreate'
      };
      // Read in a template as a string
      helpers.getTemplate('checksCreate',templateData,function(err,str){
        if(!err && str){
          // Add the universal header and footer
          helpers.addUniversalTemplates(str,templateData,function(err,str){
            if(!err && str){
              // Return that page as HTML
              callback(200,str,'html');
            } else {
              callback(500,undefined,'html');
            }
          });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
  };


  // Dashboard (view all checks)
handlers.checksList = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Dashboard',
        'body.class' : 'checksList'
      };
      // Read in a template as a string
      helpers.getTemplate('checksList',templateData,function(err,str){
        if(!err && str){
          // Add the universal header and footer
          helpers.addUniversalTemplates(str,templateData,function(err,str){
            if(!err && str){
              // Return that page as HTML
              callback(200,str,'html');
            } else {
              callback(500,undefined,'html');
            }
          });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
  };


handlers.public = function(data, callback){
    if(data.method == 'get'){
        var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
        if(trimmedAssetName.length > 0){
            helpers.getStaticAsset(trimmedAssetName,function(err, data){
                if(!err && data){
                    var contentType = 'plain';
                    if(trimmedAssetName.indexOf('.css') > -1){
                        contentType='css';
                    }

                    if(trimmedAssetName.indexOf('.png') > -1){
                        contentType='png';
                    }

                    if(trimmedAssetName.indexOf('.jpg') > -1){
                        contentType='jpg';
                    }

                    if(trimmedAssetName.indexOf('.ico') > -1){
                        contentType='favicon';
                    }

                    callback(200, data, contentType);
                }else{
                    callback(404);
                }
            });
        }else{
            callback(404);
        }


    }else{
        callback(405);
    }
};


/**
 * 
 * JSON Api handlers
 * 
 */
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

// Required data: phone
// Cleanup old checks associated with the user
handlers._users.delete = function(data,callback){
  // Check that phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',phone,function(err,userData){
          if(!err && userData){
            // Delete the user's data
            _data.delete('users',phone,function(err){
              if(!err){
                // Delete each of the checks associated with the user
                var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                var checksToDelete = userChecks.length;
                if(checksToDelete > 0){
                  var checksDeleted = 0;
                  var deletionErrors = false;
                  // Loop through the checks
                  userChecks.forEach(function(checkId){
                    // Delete the check
                    _data.delete('checks',checkId,function(err){
                      if(err){
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if(checksDeleted == checksToDelete){
                        if(!deletionErrors){
                          callback(200);
                        } else {
                          callback(500,{'Error' : "Errors encountered while attempting to delete all of the user's checks. All checks may not have been deleted from the system successfully."})
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500,{'Error' : 'Could not delete the specified user'});
              }
            });
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
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


handlers.checks = function(data, callback){
    var acceptableMethods = ['post','get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._checks[data.method](data, callback);
    }else{
        callback(405);
    }
};

handlers._checks = {};

handlers._checks.post = function(data, callback){
    var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1? data.payload.protocol :false;
    var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length>0? data.payload.url.trim() :false;
    var method = typeof(data.payload.method) == 'string' && ['post','get', 'put', 'delete'].indexOf(data.payload.method) > -1? data.payload.method :false;
    var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length>0 ? data.payload.successCodes :false;
    var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0  && data.payload.timeoutSeconds >=1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds :false;
    
    if(protocol && url && method && successCodes && timeoutSeconds){
        var token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length ==20? data.headers.token.trim():false;

        _data.read('tokens', token, function(err, tokenData){
            if(!err && tokenData){
                var userPhone = tokenData.phone;
                _data.read('users', userPhone, function(err, userData){
                    if(!err && userData){
                        var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks :[];
                        if(userChecks.length < config.maxChecks){
                            var checkId = helpers.createRandomString(20);

                            var checkObject = {
                                'id':checkId,
                                'userPhone':userPhone,
                                'protocol':protocol,
                                'url':url,
                                'method':method,
                                'successCodes':successCodes,
                                'timeoutSeconds':timeoutSeconds
                            };

                            _data.create('checks', checkId, checkObject, function(err){
                                if(!err){
                                    userData.checks = userChecks;
                                    userData.checks.push(checkId);
                                    _data.update('users', userPhone, userData, function(err){
                                        if(!err){
                                            callback(200, checkObject);
                                        }else{
                                            callback(500, {'Error':'Could not update the user with the new check'});
                                        }
                                    });
                                }else{
                                    callback(500, {'Error':'Could not create the new check'});
                                }
                            });
                        }else{
                            callback(400,{'Error':'The user already has the maximum number of checks ('+config.maxChecks+')'});
                        }
                    } else {
                        callback(403);
                    }
                });
            }else{
                callback(403)
            }
        });

    }else{
        callback(400,{'Error':'Missing required inputs or inputs are invalid'});
    }
}

handlers._checks.get = function(data, callback){
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length ==20? data.queryStringObject.id.trim():false;
    if(id){
        _data.read('checks', id, function(err, checkData){
            if(!err && checkData){
                var token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length ==20? data.headers.token.trim():false;
                
                handlers._tokens.verifyToken(token, checkData.userPhone, function(tokenIsValid){
                    if(tokenIsValid){
                        callback(200, checkData);
                    }else{
                        callback(403);
                    }
                });
            }else{
                callback(400);
            }
        });
        
       
    }else{
        callback(400,{'Error':"missig required fields"});
    }
};

handlers._checks.put = function(data, callback){
    var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length ==20? data.payload.id.trim():false;
    var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1? data.payload.protocol :false;
    var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length>0? data.payload.url.trim() :false;
    var method = typeof(data.payload.method) == 'string' && ['post','get', 'put', 'delete'].indexOf(data.payload.method) > -1? data.payload.method :false;
    var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length>0 ? data.payload.successCodes :false;
    var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0  && data.payload.timeoutSeconds >=1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds :false;

    if(id){
        if(protocol || url || method || successCodes || timeoutSeconds){
            _data.read('checks',id,function(err,checkData){
                if(!err && checkData){
                    var token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length ==20? data.headers.token.trim():false;
                
                    handlers._tokens.verifyToken(token, checkData.userPhone, function(tokenIsValid){
                        if(tokenIsValid){
                            if(protocol) {
                                checkData.protocol = protocol;
                            }

                            if(url) {
                                checkData.url = url;
                            }

                            if(method) {
                                checkData.method = method;
                            }

                            if(successCodes) {
                                checkData.successCodes = successCodes;
                            }

                            if(timeoutSeconds) {
                                checkData.timeoutSeconds = timeoutSeconds;
                            }

                            _data.update('checks',id, checkData, function(err){
                                if(!err){
                                    callback(200);
                                }else{
                                    callback(500, {'Error':'Could not update the check'});
                                }
                            });
                        }else{
                            callback(403);
                        }
                    });
                }else{
                    callback(400, {'Error':'Check ID did not exists'});
                }
            });
        }else{
            callback(400,{'Error':'Missing fields to update'});
        }
    }else{
        callback(400,{'Error':'Missing required fields'});
    }
};

handlers._checks.delete = function(data, callback){
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length ==20? data.queryStringObject.id.trim():false;
    if(id){
        _data.read('checks',id, function(err, checkData){
            if(!err && checkData){
                var token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length ==20? data.headers.token.trim():false;

                handlers._tokens.verifyToken(token, checkData.userPhone, function(tokenIsValid){
                   
                    if(tokenIsValid){
                        _data.delete('checks', id, function(err){
                            if(!err){
                                _data.read('users',checkData.userPhone,function(err, userData){
                                    if(!err && userData){
                                        var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks :[];

                                        var checkPosition = userChecks.indexOf(id);

                                        if(checkPosition > -1){
                                            userChecks.splice(checkPosition,1);
                                            _data.update('users', checkData.userPhone,userData, function(err){
                                                if(!err){
                                                    callback(200);
                                                }else{
                                                    callback(500, {'Error':'Could not update the specified user'})
                                                }
                                            });
                                        }else{
                                            callback(500,{'Error':'Could not find the check on the user\'s object, so could not remove it'});
                                        }

                                       
                                    }else{
                                        callback(500, {'Error':'Could not find user who created the check, so could not remove the check from the list of check object of user'});
                                    }
                                });
                            }else{
                                callback(500,{'Error':'Could not delete the check data'});
                            }
                       });
                        
                    }else{
                        callback(403,{'Error':'Missing required token in header, or token is invalid'});
                    }
                });
            }else{
                callback(400,{'Error':'The specified check ID does not exist'});
            }
        });



    }else{
        callback(400,{'Error':"missig required fields"});
    }
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
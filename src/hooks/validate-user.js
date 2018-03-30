// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
//const logger = require('winston');

const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const user = context.data;

    //Do validation checks
    const validationErrors = new errors.BadRequest('Invalid Parameters', {});
    //Check that we have non blank emails
    if (isBlank(user.email)) {
      validationErrors.errors.email = 'Email must be provided';
    }
    else
    {
      //Is email valid
      if (!validateEmail(user.email)) {
        validationErrors.errors.email = 'Email address is invalid';
      }
    }

    //Do we have a forename
    if (isBlank(user.forename)) {
      validationErrors.errors.forename = 'Forename must be provided';
    }

    //Do we have a surname
    if (isBlank(user.surname)) {
      validationErrors.errors.surname = 'Surname must be provided';
    }


    //If theer are any keys inteh errors object then throw error
    if (Object.keys(validationErrors.errors).length > 0) {
      throw validationErrors;
    }

    return context;
  };
};

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

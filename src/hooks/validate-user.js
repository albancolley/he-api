// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
//const logger = require('winston');

const errors = require('@feathersjs/errors');

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
  return re.test(String(email).toLowerCase());
}

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {   data } = context;

    const newUser = data;

    //Do validation checks
    const validationErrors = new errors.BadRequest('Invalid Parameters', {});
    //Check that we have non blank emails, forename and surname
    if (isBlank(newUser.email)) {
      validationErrors.errors.email = 'Email must be provided';
    }
    else
    {
      if (!validateEmail(newUser.email)) {
        validationErrors.errors.email = 'Email address is invalid';
      }
    }

    if (isBlank(newUser.forename)) {
      validationErrors.errors.forename = 'Forename must be provided';
    }

    if (isBlank(newUser.surname)) {
      validationErrors.errors.surname = 'Surname must be provided';
    }


    if (Object.keys(validationErrors.errors).length > 0) {
      throw validationErrors;
    }

    return context;
  };
};

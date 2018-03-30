// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
//const logger = require('winston');

const errors = require('@feathersjs/errors');
const utils = require('../utils/utils.js');

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const user = context.data;

    //Do validation checks
    const validationErrors = new errors.BadRequest('Invalid Parameters', {});
    //Check that we have non blank emails
    if (utils.isBlank(user.email)) {
      validationErrors.errors.email = 'Email must be provided';
    }
    else
    {
      //Is email valid
      if (!utils.validateEmail(user.email)) {
        validationErrors.errors.email = 'Email address is invalid';
      }
    }

    //Do we have a forename
    if (utils.isBlank(user.forename)) {
      validationErrors.errors.forename = 'Forename must be provided';
    }

    //Do we have a surname
    if (utils.isBlank(user.surname)) {
      validationErrors.errors.surname = 'Surname must be provided';
    }


    //If there are any keys inteh errors object then throw error
    if (Object.keys(validationErrors.errors).length > 0) {
      throw validationErrors;
    }

    return context;
  };
};

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('@feathersjs/errors');
const utils = require('../utils/utils.js');



// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const user = context.data;

    //Do validation checks
    const validationErrors = new errors.BadRequest('Invalid Parameters', {});
    //Check that we have non blank emails
    if (!utils.isBlank(user.email)  ||  !utils.isBlank(user.forename) || !utils.isBlank(user.surname)) {
      if (!utils.isBlank(user.email) && !utils.validateEmail(user.email)) {
        validationErrors.errors.email = 'Email address is invalid';
      }
    }
    else
    {
      validationErrors.errors.missing = 'Email address, forename and/or surname must be provided';
    }

    //If there are any keys inteh errors object then throw error
    if (Object.keys(validationErrors.errors).length > 0) {
      throw validationErrors;
    }

    // Esure that only the required data is updates
    context.data = {};
    if (!utils.isBlank(user.forename))
    {
      context.data.forename =  user.forename;
    }

    if (!utils.isBlank(user.surname))
    {
      context.data.surname =  user.surname;
    }

    if (!utils.isBlank(user.email))
    {
      context.data.email =  user.email;
    }

    return context;
  };
};

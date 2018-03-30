// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

//const logger = require('winston');
const dateFormat = require('dateformat');
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app,  data } = context;

    const newUser = data;

    //Do validation checks
    const validationErrors = new errors.BadRequest('Invalid Parameters', {});

    // check user doesn't already exist
    //attempt to retrive existing user by email
    const user = await app.service('users').find({
      query: {
        email: newUser.email
      }
    });

    if (user.total > 0) {
      //We have an exiting user with the same email, so reaise validation error
      validationErrors.errors.email = 'Email already taken';
    }

    if (Object.keys(validationErrors.errors).length > 0) {
      throw validationErrors;
    }

    // Esure that only the required data is saved
    context.data = {
      email: newUser.email,
      forename: newUser.forename,
      surname: newUser.surname,
      // Add the creation date
      created: dateFormat(new Date(), 'yyyy-MM-dd HH:MM:ss.l')
    };

    return context;
  };
};

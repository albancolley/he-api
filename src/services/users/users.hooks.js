

const processUser = require('../../hooks/process-user');

const validateUser = require('../../hooks/validate-user');

const updateUser = require('../../hooks/update-user');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateUser(), processUser()],
    update: [validateUser(), processUser()],
    patch: [updateUser()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

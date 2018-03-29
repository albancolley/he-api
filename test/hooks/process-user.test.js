const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');
const processUser = require('../../src/hooks/process-user');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const errors = require('@feathersjs/errors');

//const logger = require('winston');

describe('\'process-user\' hook', () => {
  let app;

  beforeEach(async () => {
    // Database adapter pagination options
    const options = {
      name: 'users',
      paginate: {
        default: 10,
        max: 25
      }
    };

    app = feathers();

    // Register `users` service in-memory
    app.use('/users', memory(options));

    // Add the hook to the dummy service
    app.service('users').hooks({
      before: {
        create: [processUser()]
      }
    });

  });

  it('No details provided', async () => {

    const result = await expect(app.service('users').create({})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, { email: 'Email must be provided', forename: 'Forename must be provided', surname: 'Surname must be provided'});
  });

  it('Invalid email provided', async () => {

    const result = await expect(app.service('users').create({email:'fred'})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, { email: 'Email address is invalid', forename: 'Forename must be provided', surname: 'Surname must be provided'});
  });

  it('Valid email only', async () => {

    const result = await expect(app.service('users').create({email:'fred@test.com'})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, { forename: 'Forename must be provided', surname: 'Surname must be provided'});
  });

  it('Valid email and forename', async () => {
    const result = await expect(app.service('users').create({email:'fred@test.com', forename: 'fred'})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, {surname: 'Surname must be provided'});
  });


  it('Valid user', async () => {
    const result = await app.service('users').create({email:'fred@test2.com', forename: 'fred', surname:'dag'});
    assert.deepEqual(result.email,  'fred@test2.com');
    assert.deepEqual(result.forename, 'fred');
    assert.deepEqual(result.surname, 'dag');
    assert.ok(result.created);
  });

  it('Duplicate user', async () => {
    await app.service('users').create({email:'fred@test2.com', forename: 'fred', surname:'dag'});
    const resultdup = await expect(app.service('users').create({email:'fred@test2.com', forename: 'fred', surname:'dag'})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(resultdup.errors, {email: 'Email already taken'});
  });


});
/*
const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processUser = require('../../src/hooks/process-user');

describe('\'process-user\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processUser()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');

    assert.deepEqual(result, { id: 'test' });
  });
});
*/

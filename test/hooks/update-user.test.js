const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const updateUser = require('../../src/hooks/update-user');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const errors = require('@feathersjs/errors');

describe('\'update-user\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async update(id, data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      before: {
        update: [updateUser()]
      }
    });
  });

  it('No details provided', async () => {

    const result = await expect(app.service('dummy').update(0, {})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, { missing: 'Email address, forename and/or surname must be provided'});
  });

  it('Invalid email provided', async () => {

    const result = await expect(app.service('dummy').update(0, {email:'fred'})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, { email: 'Email address is invalid'});
  });


  it('Extra field', async () => {
    const result = await expect(app.service('dummy').update(0, {email2:'fred@test.com'})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, { 'missing': 'Email address, forename and/or surname must be provided'});
  });

  it('Valid forename and extra field', async () => {
    const result = await app.service('dummy').update(0, {email2:'fred@test.com', forename: 'fred'});
    assert.ok(result.forename, {forename: 'fred'});
    assert.strictEqual(result.email2, undefined);
  });

  it('No email and surname', async () => {
    const result = await app.service('dummy').update(0, {email:'fred@test2.com', surname:'dag'});
    assert.deepEqual(result.email,  'fred@test2.com');
    assert.deepEqual(result.surname, 'dag');
  });


  it('All fields', async () => {
    const result = await app.service('dummy').update(0, {email:'fred@test2.com', forename: 'fred', surname:'dag'});
    assert.deepEqual(result.email,  'fred@test2.com');
    assert.deepEqual(result.forename, 'fred');
    assert.deepEqual(result.surname, 'dag');
  });


});

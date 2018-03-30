const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const validateUser = require('../../src/hooks/validate-user');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const errors = require('@feathersjs/errors');

describe('\'validate-user\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      before: {
        create: [validateUser()]
      }
    });
  });

  it('No details provided', async () => {

    const result = await expect(app.service('dummy').create({})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, { email: 'Email must be provided', forename: 'Forename must be provided', surname: 'Surname must be provided'});
  });

  it('Invalid email provided', async () => {

    const result = await expect(app.service('dummy').create({email:'fred'})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, { email: 'Email address is invalid', forename: 'Forename must be provided', surname: 'Surname must be provided'});
  });

  it('Valid email only', async () => {

    const result = await expect(app.service('dummy').create({email:'fred@test.com'})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, { forename: 'Forename must be provided', surname: 'Surname must be provided'});
  });

  it('Valid email and forename', async () => {
    const result = await expect(app.service('dummy').create({email:'fred@test.com', forename: 'fred'})).to.be.rejectedWith(errors.BadRequest);
    assert.deepEqual(result.errors, {surname: 'Surname must be provided'});
  });

});

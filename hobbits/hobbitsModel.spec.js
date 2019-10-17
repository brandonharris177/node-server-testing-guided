const Hobbits = require('./hobbitsModel.js');

const db = require('../data/dbConfig.js');

it('should set testing environment', () => {
  expect(process.env.DB_ENV).toBe('testing');
});

describe('hobbits model', () => {
  // beforeAll()
  beforeEach(async () => {
    await db('hobbits').truncate();
  });
  // afterEach()
  // afterAll()

  describe('insert()', () => {
    it('should add hobbit to database', async () => {
      // check that table is empty
      const records = await db('hobbits');
      expect(records).toHaveLength(0);

      // insert one record
      await Hobbits.insert({ name: 'sam' });

      // check we now have one record in the table
      const hobbits = await db('hobbits');
      expect(hobbits).toHaveLength(1);
    });
  });

  it('should add the provided hobbit to database', async () => {
    let hobbit = await Hobbits.insert({ name: 'sam' });
    expect(hobbit.name).toBe('sam');

    hobbit = await Hobbits.insert({ name: 'frodo' });
    expect(hobbit.name).toBe('frodo');

    const hobbits = await db('hobbits');
    expect(hobbits).toHaveLength(2);
  });
});



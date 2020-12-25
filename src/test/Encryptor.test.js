const Encryptor = require('../helpers/Encryptor');

let config;

describe('Encryptor method', () => {
  beforeEach(() => {
    config = {
      encryption: {
        saltBytes: 16,
        rounds: 1000,
        length: 64,
        algo: 'sha512',
      },
      get(key) { return config[key]; },
    };
  });

  test('Encryptor exist', () => {
    expect(Encryptor).toBeTruthy();
  });
});

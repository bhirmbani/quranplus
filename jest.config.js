// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  moduleNameMapper: {
    "~(.*)": "<rootDir>/app/$1",
  },
  "setupFiles": [
    "fake-indexeddb/auto"
]
};

module.exports = config;

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'rahimlisarkhan',
        mongodb_password: 'Nln3rszwEtQTYgEY',
        mongodb_clustername: 'Blog',
        mongodb_database: 'codioSolitions',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'rahimlisarkhan',
      mongodb_password: 'Nln3rszwEtQTYgEY',
      mongodb_clustername: 'Blog',
      mongodb_database: 'codioSolitions',
    },
  };
};
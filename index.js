var Asana = require('asana');
var minimist = require('minimist');

var projects = require('./projects');

function usage() {
  // Print usage
  console.log('Usage');
  console.log('  ASANA_TOKEN=your_token_here node index.js');
  console.log('');
}

/**
 * Verifies that argv has the specified key. If found, returns the value of that
 * key, else errors out to console after printing the message.
 */
function hasParam(argv, key, message) {
  if (!argv.hasOwnProperty(key)) {
    console.error(message);
    process.exit(1);
  } else {
    return argv[key];
  }
}

function createClient(token) {
  return Asana.Client.create()
    .useAccessToken(token);
}

function errorHandler(err) {
  console.log(err);
}

// Create options object
var argv = minimist(process.argv.slice(2));

// Switch validations
var token = hasParam(argv, 't', 'Token not provided');
var workspace = hasParam(argv, 'w', 'Workspace not provided');

// Command validation;
if (argv['_'].length === 0) {
  console.error('Command not provided');
  process.exit(1);
} else {
  var command = argv['_'][0];
  switch (command) {
    case 'list':
      projects.list(createClient(token), workspace)
        .then(projects.formatter)
        .catch(errorHandler)
  }
}
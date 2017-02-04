var Asana = require('asana');
var minimist = require('minimist');

var projects = require('./projects');
var workspaces = require('./workspaces');
var sections = require('./sections');

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
function hasParam(argv, key, message, optional) {
  if (!argv.hasOwnProperty(key) && !optional) {
    console.error(message);
    process.exit(1);
  } else if (!argv.hasOwnProperty(key) && optional) {
    return undefined;
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
var workspace = hasParam(argv, 'w', 'Workspace not provided', true);
var project = hasParam(argv, 'p', 'Project not provided', true);

// Command validation;
if (argv['_'].length === 0) {
  console.error('Command not provided');
  process.exit(1);
} else {
  var command = argv['_'][0];
  switch (command) {
    case 'list-projects':
      projects.list(createClient(token), workspace)
        .then(projects.formatter)
        .catch(errorHandler)
      break;
    case 'list-workspaces':
      workspaces.list(createClient(token))
        .then(workspaces.formatter)
        .catch(errorHandler)
      break;
    case 'list-sections':
      sections.list(createClient(token), workspace, project)
        .then(sections.formatter)
        .catch(errorHandler);
        break;
  }
}
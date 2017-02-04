var lodash = require('lodash');

var projects = require('./projects');
var workspaces = require('./workspaces');

exports = module.exports = {};

/**
 * Lists all open sections in a project.
 */
exports.list = function (client, wsIdentifier, projectIdentifier) {
  return workspaces.lookupWorkspace(client, wsIdentifier)
  .then(function (wsId) {
    return projects.lookupProject(client, wsId, projectIdentifier);
  })
  .then(function (prjId) {
    return client.projects.sections(prjId, {
      completed_since: 'now'
    });
  })
}

exports.formatter = function (response) {
  var table = require('text-table');

  var t = table(lodash.map(response.data, function (section) {
    return [section.id, section.name];
  }), {align: ['r', 'l']});

  console.log(t);
}
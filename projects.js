var lodash = require('lodash');

var workspaces = require('./workspaces');

exports = module.exports = {}

var lookupProject = exports.lookupProject = function (client, wsId, projectIdentifier) {
  return client.projects.findByWorkspace(wsId)
  .then(function (response) {
    var prj = lodash.find(response.data, function (prjObj) {
      return prjObj.id === projectIdentifier || prjObj.name === projectIdentifier;
    });

    if (prj) {
      return prj.id;
    } else {
      throw Error('Project not found')
    }
  })
}

exports.list = function (client, wsIdentifier) {
  return workspaces.lookupWorkspace(client, wsIdentifier)
  .then(function (wsId) {
    return client.projects.findByWorkspace(wsId);
  });
}

exports.formatter = function (response) {
  var table = require('text-table');

  var t = table(lodash.map(response.data, function (project) {
    return [project.id, project.name];
  }), {align: ['r', 'l']});

  console.log(t);
}